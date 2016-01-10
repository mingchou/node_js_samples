var http = require("http");
var url = require("url");
var fs = require("fs");

function writeRootContent(response) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('Welcome');
    response.end();
}

function writeRouteFileContent(path, response) {
    fs.exists(__dirname + path, function(exists){
        if (!exists) {
            response.writeHead(404, {'Content-Type' : 'text/plain'});
            response.write('404 Not Found');
            response.end();
        }
        else {
            if (fs.statSync(__dirname + path).isDirectory())
                path += '/index.html';
            fs.readFile(__dirname + path, "binary", function(err, file) {
                if (err) {
                    response.writeHead(500, 'text/plain');
                    response.write(err + '\n');
                    response.end();
                }
                else {
                    response.writeHead(200);
                    response.write(file, 'binary');
                    response.end();
                }
            });
        }
    });
}

var server = http.createServer(function(request, response){
    console.log("receive request");
    var path = url.parse(request.url).pathname;
    switch (path) {
    case '/':
        writeRootContent(response);
        break;
    default:
        writeRouteFileContent(path, response);
        break;
    }
});
server.listen(8001);