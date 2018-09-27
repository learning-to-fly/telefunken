const assert = require('assert');
var mongoose = require('mongoose');
var Topic = require("../models/topic.js");

const url = 'mongodb://localhost:27017';

 // Database Name
const dbName = 'myproject';


mongoose.connect(url+"/"+dbName, function (err) {
    if (err) throw err;
     
    console.log('Successfully connected');
     
    var exampleTopic = new Topic({
        _id: new mongoose.Types.ObjectId(),
        title: "Example Topic",
        text: "Text for example topic",
        URL: "https://learntofly/topics/exampletopic.html"
    })
     
    exampleTopic.save(function(err) {
        if (err) throw err;
         
        console.log('Example topic successfully saved.');
                     
    });
});