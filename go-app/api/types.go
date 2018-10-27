package api

import (
	"time"

	"github.com/mongodb/mongo-go-driver/bson/objectid"
)

type Topic struct {
	ID        objectid.ObjectID `bson:"_id,omitempty" json:"-"`
	IDJson    string            `bson:"-" json:"_id"`
	Title     string            `bson:"title" json:"title"`
	Text      string            `bson:"text" json:"text"`
	CreatedAt time.Time         `bson:"created_at" json:"createdDate"`
}

type NewPageResponse struct {
	ID string `json:"_id"`
}
