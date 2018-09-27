var express = require('express')
  , router = express.Router()

var db = require('./db')

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/all', function(req, res) {
  console.log("Inside GET ALL");
  var collection = db.get().collection('documents')
  collection.find().toArray(function(err, docs) {
    res.status(200).send(docs);
  })
})

router.get('/recent', function(req, res) {
  var collection = db.get().collection('documents')

  collection.find().sort({'date': -1}).limit(100).toArray(function(err, docs) {
    res.status(200).send(docs);
  })
})

module.exports = router