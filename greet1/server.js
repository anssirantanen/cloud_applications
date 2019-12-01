'use strict';

const express = require('express');
const axios = require('axios');


const PORT = 8090;
const HOST = '0.0.0.0';

const greet2URL = process.env.GREET_URL;
const greet2Port= process.env.GREET_PORT;

const app = express();
app.get('/', (req, res) => {
    const sender = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = res.socket.remoteAddress;
    const port = req.connection.remotePort;
    
    const msg = `hello from ${sender}:${port} to ${HOST}:${PORT}`

    axios.get(`http://${greet2URL}:${greet2Port}`)
    .then(result => {
      const merge = msg +"</br>"+ result.data
      res.send(merge)
    })
    .catch(err => {
      console.log(err)
      res.send("err")
    })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;