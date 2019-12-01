const chai=  require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const nock = require('nock');


const expect = chai.expect;
chai.use(chaiHttp);

const greet2URL = process.env.GREET_URL;
const greet2Port= process.env.GREET_PORT;

//hello from 127.0.0.1:55624 to 0.0.0.0:8090


const scope = nock(`http://${greet2URL}:${greet2Port}`)
  .get("/")
  .reply(200,"hello from 127.0.0.1:55624 to 0.0.0.0:8090")

describe("hello call", () =>{
       it("should return 2 hello messages", (done) =>{
        chai.request(app)
           .get("/")
           .end((err,res) =>{
               expect(res).to.have.status(200)
               const lines = res.text.split("</br>")
               lines.forEach((line) =>{
                expect(line).to.include('hello from')
               } )
             done();
           }) 
       } )
} )