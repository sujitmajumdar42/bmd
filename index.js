var express = require('express')
  , bodyParser = require("body-parser")
  , cookieParser = require('cookie-parser')
  , user = require('./routes/user.js')
  , http = require('http')
  , path = require('path') ;

var app = express();
module.exports = app;

var nconf = require('nconf');
nconf.argv().env().file({ file: 'config.json' });

app.set('port', process.env.PORT || nconf.get('node:port'));
app.set('www', __dirname + '/www');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser("sdd", {signed: true}));

var router = express.Router();

app.use('/', router);
app.get('/user',user.get);
app.use('/',express.static(__dirname + '/www')); 
app.get('/', function(req, res) {
    res.sendfile('./www/index.html');
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});