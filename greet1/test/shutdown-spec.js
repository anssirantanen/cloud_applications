const chai=  require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const nock = require('nock');


const expect = chai.expect;
chai.use(chaiHttp);

const greet2URL = process.env.GREET_URL;
const greet2Port= process.env.GREET_PORT;

//hello from 127.0.0.1:55624 to 0.0.0.0:8090

const chaiReq = chai.request(app)
const scope = nock(`http://${greet2URL}:${greet2Port}`)
  .post("/shutdown")
  .reply(200,"")

describe("shutdowm", () =>{
       it("stop server cluster", (done) =>{
        chai.request(app)
           .post("/shutdown")
           .end((err,res) =>{
               expect(res.status).to.equal(200)
             done();
           }) 
       } )
} )