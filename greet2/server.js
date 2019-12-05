'use strict';

const express = require('express');

// Constants
const PORT = 8090;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
    const sender = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = res.socket.remoteAddress;
    const port = req.connection.remotePort;
    const msg = `hello from ${sender}:${port} to ${HOST}:${PORT}`
  res.send(msg);
});
app.post('/shutdown',(req,res) => {
  res.send();
  process.kill(process.pid, "SIGINT");
})
var server = app.listen(PORT, HOST);

const shutDown =() =>  {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
  });
}
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = server;