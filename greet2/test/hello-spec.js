const chai=  require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

//const requester= chai.request(app).keepOpen();

describe("hello call", () =>{
       it("should return hello message", (done) =>{
        chai.request(app)
           .get("/")
           .end((err,res) =>{
               expect(res).to.have.status(200)
               expect(res.text).to.include('hello from')
             done();
           }) 
       } )
} )