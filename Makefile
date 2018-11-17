run-app:
	node app/server.js

run-go-app:
	go run go-app/main.go

build-go-app:
	go build -o telefunken go-app/main.go

run-mongo-docker:
	docker run --rm -it --name mongo -v $$PWD/mongo-data:/data/db -p 27017:27017 mongo
