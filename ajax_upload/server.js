//http://stackoverflow.com/questions/2198470/javascript-uploading-a-file-without-a-file/2198524#2198524
//http://stackoverflow.com/questions/23691194/node-express-file-upload
//https://developer.tizen.org/dev-guide/web/2.3.0/org.tizen.mobile.web.appprogramming/html/tutorials/w3c_tutorial/comm_tutorial/upload_ajax.htm

var express = require("express");
var app = express();
var busboy = require('connect-busboy');
var fs = require("fs");

app.use(busboy());

app.use(express.static(__dirname, {maxAge:86400000}));

app.route('/upload').post(function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("uploading: " + filename);
        //Path where image will be uploaded
        fstream = fs.createWriteStream(__dirname + '/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {    
            console.log("Upload finished of " + filename);              
            res.redirect('back');           //where to go next
        });
    });
});
app.listen(8001);