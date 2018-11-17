var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
const bPages = require('./routes');
var mongoose = require('mongoose');

//var dbName = "myproject"

app.use(express.static(path.join('reactapp', 'build')));
app.use('/', bPages);
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/myproject',  {useNewUrlParser: true}, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...');
    })
  }
})

