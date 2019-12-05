'use strict';

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');
const { EOL } = require('os');

const PORT = 8090;
const HOST = '0.0.0.0';

const greet2URL = process.env.GREET_URL;
const greet2Port= process.env.GREET_PORT;
const bootLog = process.env.BOOT_LOG || "./boot.log";

const fib =(n)=>  {
  if (n < 2){
    return n
  }
  return fib(n - 1) + fib (n - 2)
}

//synchronous file write for exact state
const appendLog = (msg) =>{
  const date = new Date().toISOString(); 
  const entry = `${msg} ${date}${EOL}`;
  fs.appendFileSync(bootLog, entry);
} 
const readLog = (cb) =>{
  fs.readFile(bootLog, 'utf8', function(err, data) {
    cb(err,data)
  });
} 
const app = express();
app.use(bodyParser.text({ type: 'text/*' }))

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
app.post('/fibo',(req,res) =>{
  try {
    const number = parseInt(req.body)
    if(number<0){
      const neg = "Error: negative number"
      res.status(400).send(neg)
    }else{
      const fibRes = fib(number)
      res.send(String(fibRes))
    } 
  } catch (error) {
    const nan = "Error: not a number"
    res.status(400).send(nan)
  }
});
app.get('/run-log',(req,res) =>{
  readLog((err,data) =>{
    if(err){
      res.status(500).send(err)
    }else{
      const lines = data.split(EOL).map(line => { return`${line}<br>`}).join("");
      res.send(lines);
    } 
  } )
})

var server = app.listen(PORT, HOST, () =>{
  console.log(`Running on http://${HOST}:${PORT}`);
  appendLog("BOOT");
  server.close( () => {appendLog("SHUTDOWN")})
  
} );
const shutDown =() =>  {
  console.log('Received kill signal, shutting down gracefully');
  app.close(() => {
      console.log('Closed out remaining connections');
      appendLog("SHUTDOWN");
      process.exit(0);
  });

  setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

process.on('exit', () => {
  appendLog("SHUTDOWN");
});

module.exports = server;