var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser');
    app = express();

var jsonParser = bodyParser.json()

var mongoose   = require('mongoose');
var Topic = require("../models/topic.js");

var upload = require('multer')();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


/*
 Get all topics:
 curl -v -X GET 'http://10.55.81.13:3000/v1/pages'

 Create new topic
 curl -v -POST --header "Content-Type: application/json" -d '{"title":"1232", "text":"some text"}' 'http://10.55.81.13:3000/v1/page'

 Edit topic
 curl -v -X PUT --header "Content-Type: application/json" -d '{"title":"!!!!!!"}' 'http://10.55.81.13:3000/v1/page/5be94e2065eb35355a8801f7'

 Delete topic by _id
 curl -v -X DELETE --header "Content-Type: application/json" 'http://10.55.81.13:3000/v1/page/5be9609946d49d4ac5e2378b'

*/


router.route('/v1/pages')
	.get(jsonParser, function(req, res) {
		Topic.find(function(err, topics) {
			if (err)
				res.send(err);

			res.json(topics);
		});
	});

router.route('/v1/page')
	.post(jsonParser, function(req, res) {
		var topic = new Topic();
                topic._id = new mongoose.Types.ObjectId();
                topic.title = req.body.title;
                topic.text = req.body.text;
                topic.URL = req.body.URL;

		topic.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Topic created!' });
		});

		
	})

router.route('/v1/page/:topic_id')
	.get(jsonParser, function(req, res) {
		Topic.findById(req.params.topic_id, function(err, topic) {
			if (err)
				res.send(err);
			res.json(topic);
		});
	})
	.put(jsonParser, function(req, res) {
		Topic.findById(req.params.topic_id, function(err, topic) {

			if (err)
				res.send(err);
                        if (req.body.title) 
                                res.send({ message: 'Title is empty!' });  
			if (topic) {
                            topic.title = req.body.title
                            topic.save(function(err) {
			            if (err)
					res.send(err);

				    res.json({ message: 'Topic title updated!' });
        			});
                        }
                        else res.send({ message: 'Topic not found!' });

		});
	})
	.delete(jsonParser, function(req, res) {
		Topic.deleteOne({
			_id: req.params.topic_id
		}, function(err, topic) {
			if (err)
				res.send(err);

			res.json({ message: 'Topic successfully deleted' });
		});
	});


 module.exports = router
