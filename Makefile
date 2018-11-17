run-app:
	node app/server.js

run-go-app:
	go run go-app/main.go

build-go-app:
	go build -o telefunken go-app/main.go

run-mongo-docker:
	docker run --rm -it --name mongo -v $$PWD/mongo-data:/data/db -p 27017:27017 mongo:4

docker-build-node-app:
	docker build -t telefunken-node-app .

docker-run-node-app:
	docker run --name telefunken-node-app --rm -it -p 3000:3000 --env MONGO_CONN=mongodb://localhost:27017/ telefunken-node-app

docker-run-app-80:
	APP_PORT=80 docker-compose up -d

docker-run-app-3000:
	docker-compose up -d

docker-stop-app:
	docker-compose down
