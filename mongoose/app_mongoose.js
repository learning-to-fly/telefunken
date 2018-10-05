const assert = require('assert');
var mongoose = require('mongoose');
var Topic = require("../models/topic.js");

const url = 'mongodb://localhost:27017';

 // Database Name
const dbName = 'myproject';


mongoose.connect(url+"/"+dbName, function (err) {
    if (err) throw err;
     
    console.log('Successfully connected');
     
    var topics = [
        new Topic({
            _id: new mongoose.Types.ObjectId(),
            title: "Example Topic 1",
            text: "Text for example topic 1",
            URL: "https://learntofly/topics/exampletopic.html"
        }),
        new Topic({
            _id: new mongoose.Types.ObjectId(),
            title: "Example Topic 2",
            text: "Text for example topic 2",
            URL: "https://learntofly/topics/exampletopic.html"
        }),
        new Topic({
            _id: new mongoose.Types.ObjectId(),
            title: "Example Topic 3",
            text: "Text for example topic 3",
            URL: "https://learntofly/topics/exampletopic.html"
        }),
        new Topic({
            _id: new mongoose.Types.ObjectId(),
            title: "Example Topic 4",
            text: "Text for example topic 4",
            URL: "https://learntofly/topics/exampletopic.html"
        }),
        new Topic({
            _id: new mongoose.Types.ObjectId(),
            title: "Example Topic 5",
            text: "Text for example topic 5",
            URL: "https://learntofly/topics/exampletopic.html"
        }),
        new Topic({
            _id: new mongoose.Types.ObjectId(),
            title: "Example Topic 6",
            text: "Text for example topic 6",
            URL: "https://learntofly/topics/exampletopic.html"
        }),
        new Topic({
            _id: new mongoose.Types.ObjectId(),
            title: "Example Topic 7",
            text: "Text for example topic 7",
            URL: "https://learntofly/topics/exampletopic.html"
        })            
];
    topics.map(function(topic){
        topic.save(function(err) {
            if (err) throw err;
         
            console.log('Example topic successfully saved.');
                     
        });
    });

});