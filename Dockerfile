# docker build -t telefunken-node-app .
# docker run --name telefunken-node-app --rm -it -p 3000:3000 --env MONGO_CONN=mongodb://localhost:27017/ telefunken-node-app
FROM node:11-alpine

RUN mkdir /node-app/
WORKDIR /node-app/

RUN npm install express mongoose multer

ADD app /node-app/app/
ADD reactapp /node-app/reactapp/
ADD models /node-app/models/
ADD package-lock.json /node-app/package-lock.json

EXPOSE 3000

CMD node app/server.js
