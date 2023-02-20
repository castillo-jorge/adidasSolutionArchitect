const request = require("supertest");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

//define API URL
const baseAPIURL = "http://localhost:" + port;

let productID = "HY3785";
let invalidProductID = "notvalidreferencetest";

describe("Test GET /review/", () => {
  beforeAll(async () => {
    // set up the todo
    //await request(baseURL).post("/todo").send(newTodo);
  });
  afterAll(async () => {
    //await request(baseURL).delete(`/todo/${newTodo.id}`);
  });
  test("should return 200", () => {
    return request(baseAPIURL)
      .get("/review/" + productID)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
  test("check return data", () => {
    return request(baseAPIURL)
      .get("/review/" + productID)
      .then((response) => {
        expect(response.body.productID).toBe(productID);
        expect(response.body.AvgReviews).toBe(3.01);
        expect(response.body.NumReviews).toBe(0);
      });
  });
  test("check invalid productID", () => {
    return request(baseAPIURL)
      .get("/review/" + invalidProductID)
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
});
