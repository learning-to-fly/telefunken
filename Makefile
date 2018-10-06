run-app:
	node mongoose/server_mongoose.js

run-mongo-docker:
	docker run --rm -it --name mongo -v $$PWD/mongo-data:/data/db -p 27017:27017 mongo
