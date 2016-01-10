
var express = require("express");
var socket_io = require("socket.io");
var app = express();

app.use(express.static(__dirname + '/public'));
app.listen(8001);

var conn = socket_io.listen(app);
conn.on('connection', function(socket) {
    setInterval(function() {
        socket.emit('message', {'message':'hello world ' + new Date()});
    }, 1000);
});