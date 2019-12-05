const chai=  require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;
chai.use(chaiHttp);

describe("shutdowm", () =>{
       it("stop server", (done) =>{
         ""
        chai.request(app)
           .post("/shutdown")
           .end((err,res) =>{
               expect(res.status).to.equal(200)
             done();
           }) 
       } )
} )