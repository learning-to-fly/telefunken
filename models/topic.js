var mongoose = require('mongoose');
 
var topicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required:true},
    text: String,
    createdDate: { type: Date, default: Date.now },
    URL: String
});
 
var Topic = mongoose.model('Topic', topicSchema);
 
module.exports = Topic;