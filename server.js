var
  path = require('path'),
  http = require('http'),
  paperboy = require('paperboy'),

  PORT = 8002,
  WEBROOT = path.dirname(__filename);

http.createServer(function(req, res) {
  paperboy
    .deliver(WEBROOT, req, res)
    .addHeader('Expires', 300)
    .addHeader('X-PaperRoute', 'Node')
    .otherwise(function(err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end("Error 404: File not found");
    });
}).listen(PORT);
