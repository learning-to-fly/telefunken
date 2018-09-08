var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join('reactapp', 'build')));

app.listen(3000, function(){
    console.log("Magic happens now at port 3000");
});
