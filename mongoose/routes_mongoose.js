var express = require('express'),
    router = express.Router()
var Topic = require("../models/topic.js")

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/all', function(req, res) {
    console.log("Inside GET FIND");
    Topic.find({
        title: /Topic/i
    }).exec(function(err, topics){
        if (err) throw err;
        res.status(200).send(topics);
    })
  })

  router.get('/:id', function(req, res) {
    var id = req.params.id;
    console.log("FIND by ID " + id);
    Topic.findById(id, function(err, topics){
        if (err) throw err;
        res.status(200).send(topics);
    })
  })

 module.exports = router