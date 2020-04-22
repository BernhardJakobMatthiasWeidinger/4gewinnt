var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/', function(req, res){
    var path = require('path');
    res.sendFile(path.resolve('../client/index.html'));
});

io.on('connection', function(socket){
	console.log('user connected');
	
	socket.on('hello', function(msg) {
		console.log(msg);
	});
});