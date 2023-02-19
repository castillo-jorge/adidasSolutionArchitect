//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../dist/index");
let should = chai.should();

chai.use(chaiHttp);

/**
 * Test the get route
 */

describe("/GET review valid", () => {
  let productID = "HY3785";
  it("it should get a review", (done) => {
    chai
      .request(server)
      .get("/review/" + productID)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("productID").eql(productID);
        res.body.should.have.property("AvgReviews").gte(0).lte(5);
        res.body.should.have.property("NumReviews").gte(0);
        done();
      });
  });
});

describe("/GET review invalid", () => {
  let productID = "HY3785e";
  it("it should not get a review", (done) => {
    chai
      .request(server)
      .get("/review/" + productID)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });
});
