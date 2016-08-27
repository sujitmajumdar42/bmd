/*var http = require('http')
http.createServer(function(request,response){
	response.writeHead(200,{"Content-Type":"text/plain"})
	response.end("Book My dine at "+process.env.PORT+"\n database:"+process.env.DATABASE_URL)
	
}).listen(process.env.PORT,function(){
	console.log("App is running at:"+process.env.PORT);
})*/

var express = require('express')
  , bodyParser = require("body-parser")
  , http = require('http')
  , path = require('path');

var app = express();
module.exports = app;

var nconf = require('nconf');
nconf.argv().env().file({ file: 'config.json' });

app.set('port', process.env.PORT || nconf.get('node:port'));
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

app.use('/', router);
app.get('/', function(req, res) {
    res.sendfile('./views/index.html');
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});