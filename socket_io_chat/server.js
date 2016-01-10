var http = require("http");
var fs = require("fs");
var io = require("socket.io");
var url = require("url");

var server = http.createServer(function(request, response){
    console.log("new http request");
    var path = url.parse(request.url).pathname;
    
    fs.readFile(__dirname+path, function(error, data){
        if (error) {
            console.log(__dirname + path + " 404 not found");
            response.writeHead(404);
        }
        else {
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write(data, 'binary');
        }
        response.end();
    });
});

server.listen(8001);

var all_users = {};
var all_users_num = 0;

var conn = io.listen(server);

conn.on('connection', function(socket){
    console.log("new connection");
    socket.on('login', function(data) {
        console.log(data.username + ' enter to chat room');
        socket.username = data.username;
        socket.broadcast.emit('add user', {username: socket.username});
        ++all_users_num;
        all_users[data.username] = data.username;
    });
    
    socket.on('send message to server', function(data) {
        console.log('receive message ' + data.message);
        socket.broadcast.emit('new message', {username: socket.username, message: data.message});
    });
});
