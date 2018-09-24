var express = require('express');
var app = express();
var path = require('path');
const bPages = require('./routes');
var db = require('./db');

//var dbName = "myproject"

app.use(express.static(path.join('reactapp', 'build')));
app.use('/', bPages);

db.connect('mongodb://localhost:27017', "myproject", function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...');
    })
  }
})

