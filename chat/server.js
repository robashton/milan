var
  path = require('path'),
  http = require('http'),
  paperboy = require('paperboy'),
  socketio = require('socket.io'),

  PORT = 8003,
  WEBROOT = path.dirname(__filename);

var server = http.createServer(function(req, res) {
  paperboy
    .deliver(WEBROOT, req, res)
    .addHeader('Expires', 300)
    .addHeader('X-PaperRoute', 'Node')
    .otherwise(function(err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end("Error 404: File not found");
    });
});


var io = socketio.listen(server);
server.listen(PORT);

var registerSocket = function(socket) {
  socket.on('chat', function (data) {
    socket.broadcast.emit('chat', data);
  });
};

io.sockets.on('connection', registerSocket);


