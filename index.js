var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log("socket", io.engine.clientsCount)
  socket.on('chat message', function(msg){
  	console.log(msg)
    io.emit('chat message', msg);
  });
});

io.on('disconnect', function(user){
	console.log("socket", io.engine.clientsCount)
 	io.emit('disconnect', user);
 	console.log(socket.name + ' has left the chat.');
});



http.listen(5000, function(){
  console.log('listening on *:5000');
});
