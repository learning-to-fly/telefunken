package main

import (
	"context"
	"log"
	"time"

	"github.com/learning-to-fly/telefunken/go-app/handlers"
	"github.com/learning-to-fly/telefunken/go-app/storage"
)

const (
	address   = "0.0.0.0:3080"
	mongoConn = "mongodb://localhost:27017"
)

func main() {
	ctx, cancelFn := context.WithCancel(context.Background())
	db, err := storage.New(ctx, mongoConn)
	if err != nil {
		log.Fatalf("failed to connect mongodb: %s", err)
	}

	application := handlers.New(address, db)
	log.Fatalf("application closed with error: %s", application.Run(ctx))

	// TODO: handle shutdown
	cancelFn()
	db.WaitClose(time.Second * 10)
}
