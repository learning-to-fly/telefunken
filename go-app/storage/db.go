package storage

import (
	"context"
	"log"
	"time"

	"github.com/learning-to-fly/telefunken/go-app/api"
	"github.com/mongodb/mongo-go-driver/bson"
	"github.com/mongodb/mongo-go-driver/bson/objectid"
	"github.com/mongodb/mongo-go-driver/mongo"
	"github.com/pkg/errors"
)

const mongoDBName = "myproject"
const collectionName = "topics"

var ErrNotFound = errors.New("not found")

type DB struct {
	db     *mongo.Database
	doneCh chan struct{}
}

func New(ctx context.Context, connString string) (*DB, error) {
	mng, err := mongo.NewClient(connString)
	if err != nil {
		return nil, errors.Wrapf(err, "failed to create mongodb client: %s", connString)
	}
	if err := mng.Connect(ctx); err != nil {
		return nil, errors.Wrapf(err, "failed to connect mongodb: %s", connString)
	}

	doneCh := make(chan struct{})
	go func() {
		<-ctx.Done()
		if err := mng.Disconnect(ctx); err != nil {
			log.Printf("failed to disconnect from mongodb: %s", err)
		} else {
			log.Print("disconnected from mongodb")
		}
		close(doneCh)
	}()

	db := mng.Database(mongoDBName)
	return &DB{db: db, doneCh: doneCh}, nil
}

func (db DB) WaitClose(timeout time.Duration) error {
	select {
	case <-db.doneCh:
		return nil
	case <-time.After(timeout):
		return errors.New("close mongodb timeout exceeded")
	}
}

func (db *DB) Get(ctx context.Context, idHex string) (*api.Topic, error) {
	id, err := objectid.FromHex(idHex)
	if err != nil {
		return nil, errors.Wrapf(err, "failed to parse ID: '%s'", idHex)
	}

	var topicOne api.Topic
	filter := bson.NewDocument(bson.EC.ObjectID("_id", id))
	row := db.db.Collection(collectionName).FindOne(ctx, filter)
	if err := row.Decode(&topicOne); err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.Wrapf(ErrNotFound, "not found topic for: %s", idHex)
		}
		return nil, errors.Wrapf(err, "failed to find one for: %s", idHex)
	}

	topicOne.IDJson = topicOne.ID.Hex()
	return &topicOne, nil
}

func (db *DB) GetAll(ctx context.Context) ([]api.Topic, error) {
	cursor, err := db.db.Collection(collectionName).Find(ctx, nil)
	if err != nil {
		return nil, errors.Wrap(err, "failed to find")
	}

	var topics []api.Topic
	for cursor.Next(ctx) {
		var topic api.Topic
		if err := cursor.Decode(&topic); err != nil {
			return nil, errors.Wrap(err, "failed to decode record")
		}
		topic.IDJson = topic.ID.Hex()
		topics = append(topics, topic)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}
	if err := cursor.Close(ctx); err != nil {
		return nil, errors.Wrap(err, "failed to close cursor")
	}

	return topics, nil
}

func (db *DB) Put(ctx context.Context, topic api.Topic) (string, error) {
	res, err := db.db.Collection(collectionName).InsertOne(ctx, topic)
	if err != nil {
		return "", err
	}

	if objID, ok := res.InsertedID.(objectid.ObjectID); ok {
		return objID.Hex(), nil
	}

	return "", nil
}

func (db *DB) Update(ctx context.Context, topic api.Topic) error {
	id, err := objectid.FromHex(topic.IDJson)
	if err != nil {
		return errors.Wrapf(err, "failed to parse ID: '%s'", topic.IDJson)
	}
	topic.ID = id

	filter := bson.NewDocument(bson.EC.ObjectID("_id", id))
	if _, err := db.db.Collection(collectionName).ReplaceOne(ctx, filter, topic); err != nil {
		return err
	}

	return nil
}
