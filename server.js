var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

io.on('connection', function (socket) {
    socket.on('connected', function (user) {
        console.log(user + ' connected');
        socket.broadcast.emit('connected', user);
    });
    socket.on('message', function (message) {
        console.log(message);
        socket.broadcast.emit('message', message);
    });
});
