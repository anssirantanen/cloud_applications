const chai=  require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe("fibo", () =>{
       it("reject nan", (done) =>{
        chai.request(app)
           .post("/fibo")
           .set("content-type", "text/plain")
           .send("txt")
           .end((err,res) =>{
               expect(res).to.have.status(400)
               expect(res.text).to.equal("Error: not a number")
             done();
           }) 
       }),
       it("reject nan", (done) =>{
        chai.request(app)
           .post("/fibo")
           .set("content-type", "text/plain")

           .send("-1")
           .end((err,res) =>{
               expect(res).to.have.status(400)
               expect(res.text).to.equal("Error: negative number")
             done();
           }) 
       }),
       it("calculate n", (done) =>{
        chai.request(app)
           .post("/fibo")
           .set("content-type", "text/plain")

           .send("10")
           .end((err,res) =>{
               expect(res).to.have.status(200)
               expect(res.text).to.equal("55")
             done();
           }) 
       } )
} )