const request = require("supertest");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

//define API URL
const baseAPIURL = "http://localhost:" + port;

let productID = "HY3785";
let invalidProductID = "notvalidreferencetest";

describe("Test GET /product", () => {
  beforeAll(() => {
    // set up the todo
  });
  afterAll(() => {});
  test("should return 200", () => {
    return request(baseAPIURL)
      .get("/product/" + productID)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
  test("check return data", () => {
    return request(baseAPIURL)
      .get("/product/" + productID)
      .then((response) => {
        expect(response.body.id).toBe(productID);
        expect(response.body).toHaveProperty("review");
        expect(response.body.review.productID).toBe(productID);
      });
  });
  test("check invalid productID", () => {
    return request(baseAPIURL)
      .get("/product/" + invalidProductID)
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
});
