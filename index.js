/*var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/
var http = require('http')
console.log(process.env.PORT);
http.createServer(function(request,response){
	response.writeHead(200,{"Content-Type":"text/plain"})
	response.end("Book My dine at "+process.env.PORT+"\n database:"+process.env.DATABASE_URL)
	console.log(process.env.PORT);
}).listen(process.env.PORT)