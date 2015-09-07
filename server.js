var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs'), path = require('path');
var config = require('./config');


var app = express();   
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var api = express.Router();     
api.get('/', function(req, res) {
    res.json({ message: 'This is the API!' });   
});

api.get('/:directory/*', function(req, res) {
    var folderPath = config.directories[req.params.directory] + "/" + req.params[0];
    fs.readdir(folderPath, function(err, content){
        if (err) {
            res.json({ message: 'Folder does not exist.', error: 404 });  
            return;
        }

        files = [];
        folders = [];
        for (var i in content) {
            if (fs.statSync(path.join(folderPath, content[i])).isDirectory()) {
                folders.push(content[i]);
            }
            else {
                files.push(content[i]);
            }
        }
        res.json({ files: files, folders: folders, path: req.params[0],  code: 200 });
    });
});
app.use('/api/v1/', api);

var server = express.Router(); 
server.get('/:directory/*', function(req, res) {
    var filePath = config.directories[req.params.directory] + "/" + req.params[0];
    res.sendFile(filePath);
});
app.use('/file/', server);

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;
app.listen(port);
console.log('App listening on http://localhost:' + port);