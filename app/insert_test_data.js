const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {title : "Title of page 1", content: "page content 1"},
    {title : "Title of page 2", content: "page content 2"},
    {title : "Title of page 3", content: "page content 3"}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

  // Connection URL
const url = 'mongodb://localhost:27017';

 // Database Name
const dbName = 'myproject';

 // Use connect method to connect to the server

MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function() {
      client.close();
    });
});

