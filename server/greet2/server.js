'use strict';

const express = require('express');

// Constants
const PORT = 8080;
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

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);