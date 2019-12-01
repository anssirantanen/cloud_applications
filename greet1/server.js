'use strict';

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const PORT = 8090;
const HOST = '0.0.0.0';

const greet2URL = process.env.GREET_URL;
const greet2Port= process.env.GREET_PORT;

const fib =(n)=>  {
  if (n < 2){
    return n
  }
  return fib(n - 1) + fib (n - 2)
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

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;