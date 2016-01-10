//http://blog.modulus.io/nodejs-and-express-static-content

var express = require("express");
var app = express();
var oneDay = 86400000;

app.use(express.static(__dirname + '/public'));
app.listen(8001);