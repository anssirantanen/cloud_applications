const chai=  require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const fs = require('fs');
const { EOL } = require('os');


const expect = chai.expect;
chai.use(chaiHttp);

describe("run log", () =>{
       it("should return list of shutdow and boot times", (done) =>{
        chai.request(app)
           .get("/run-log")
           .end((err,res) =>{
               expect(res).to.have.status(200)
               const lines = res.text.split("</br>")
               expect(lines.length).to.be.greaterThan(0)
               expect(lines[0].startsWith("BOOT ")).to.equal(true)
             done();
           }) 
       } ),
       it("should log on shutdown", (done) =>{
           const fun = () => {
            const fileC = fs.readFileSync('./boot.log', 'utf8')
            const lines = fileC.split(EOL).filter((e) => e !== '')
            expect(lines[lines.length -1].startsWith("SHUTDOWN")).to.equal(true)
            done();
           }
            app.down(fun);

       } )
} )