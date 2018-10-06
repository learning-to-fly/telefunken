var express = require('express'),
    router = express.Router()
var Topic = require("../models/topic.js")
var upload = require('multer')();

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

  router.get('/page/:id', function(req, res) {
    var id = req.params.id;
    console.log("FIND by ID " + id);
    Topic.findById(id, function(err, topics){
        if (err) throw err;
        res.status(200).send(topics);
    })
  })

  // testing:
  // curl -X POST -F title=1232 -F text='some text' 'http://localhost:3000/page'
  router.post('/page', upload.array(), function(req, res) {
    var title = req.body.title;
    var text = req.body.text;
    console.log(`Save page: "${title}" with "${text}"`);
    res.status(200).send({result: "ok"});
  })

 module.exports = router
