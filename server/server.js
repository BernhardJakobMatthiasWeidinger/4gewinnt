var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var players = 0;

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/', function(req, res){
    var path = require('path');
    res.sendFile(path.resolve('../client/index.html'));
});

io.on('connection', function(socket){
	console.log("user connect");
	players++;
	
    var titleScreen = fs.readFileSync('./images/title.jpg', 'base64');
	socket.emit('init', titleScreen, players);
	
	
	socket.on('played', function(cell) {
		io.emit("played", cell);
	});
	
	socket.on('disconnect', function() {
	    console.log("user disconnect");
	    players--;
    });
});