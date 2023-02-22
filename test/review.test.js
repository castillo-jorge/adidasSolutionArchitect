const request = require("supertest");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

//define API URL
const baseAPIURL = "http://localhost:" + port;

/*
 * Test data initialization
 */
let productID = "HY3785";
let invalidProductID = "notvalidreferencetest";
let newProductToAdd_OK = {
  productID: "APItest1234",
  AvgReviews: 2.97,
  NumReviews: 4,
};
let newProductToAdd_FailConstraint = {
  productID: "APItest2345",
  AvgReviews: 6,
  NumReviews: 4,
};
let newProductToAdd_FailConstraint2 = {
  productID: "APItest3456",
  AvgReviews: -1,
  NumReviews: 4,
};
let newProductToAdd_FailConstraint3 = {
  productID: "APItest5678",
  AvgReviews: 2.97,
  NumReviews: -1,
};
let newProductToAdd_FailConstraint4 = {
  productID: "APItest5678",
  AvgReviews: 2.97,
  NumReviews: 3.45,
};
let ProductToUpdate_OKUpdate = {
  productID: "APItest1234",
  AvgReviews: 4,
  NumReviews: 8,
};
let ProductToUpdate_FailConstraint = {
  productID: "APItest1234",
  AvgReviews: -1,
  NumReviews: 8,
};
let ProductToUpdate_FailConstraint2 = {
  productID: "APItest1234",
  AvgReviews: 6,
  NumReviews: 8,
};
let ProductToUpdate_FailConstraint3 = {
  productID: "APItest1234",
  AvgReviews: 2.97,
  NumReviews: -1,
};
let ProductToUpdate_FailConstraint4 = {
  productID: "APItest1234",
  AvgReviews: 2.97,
  NumReviews: 3.75,
};

/**
 * Test set for get verb
 */
describe("Test GET /review/", () => {
  beforeAll(async () => {});
  afterAll(async () => {});
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

/**
 * Test set for POST verb
 */
describe("Test POST /review/", () => {
  beforeAll(() => {});
  afterAll(() => {
    //cleanse created entry to test POST methods
    return request(baseAPIURL)
      .delete("/review/" + newProductToAdd_OK.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==");
  });
  test("check POST new Data Auth fails", () => {
    return (
      request(baseAPIURL)
        .post("/review/" + newProductToAdd_OK.productID)
        //.set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
        .then((response) => {
          expect(response.statusCode).toBe(401);
          expect(response.body).toHaveProperty("error");
        })
    );
  });
  test("check POST new Data success", () => {
    return request(baseAPIURL)
      .post("/review/" + newProductToAdd_OK.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .send(newProductToAdd_OK)
      .then((response) => {
        expect(response.statusCode).toBe(204);
        expect(JSON.stringify(response.body)).toBe("{}");
      });
  });
  test("check POST new Data failed (existing id)", () => {
    return request(baseAPIURL)
      .post("/review/" + newProductToAdd_OK.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .send(newProductToAdd_OK)
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });
  test("check POST new Data failed (no data to create)", () => {
    return request(baseAPIURL)
      .post("/review/" + newProductToAdd_OK.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });
  test("check POST new Data failed (fail max AvgReviews constraint)", () => {
    return request(baseAPIURL)
      .post("/review/" + newProductToAdd_OK.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .send(newProductToAdd_FailConstraint)
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });
  test("check POST new Data failed (fail min AvgReviews constraint)", () => {
    return request(baseAPIURL)
      .post("/review/" + newProductToAdd_OK.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .send(newProductToAdd_FailConstraint2)
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });
  test("check POST new Data failed (fail min NumReviews constraint)", () => {
    return request(baseAPIURL)
      .post("/review/" + newProductToAdd_OK.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .send(newProductToAdd_FailConstraint3)
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });
  test("check POST new Data failed (fail min NumReviews must be integer)", () => {
    return request(baseAPIURL)
      .post("/review/" + newProductToAdd_OK.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .send(newProductToAdd_FailConstraint4)
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });
});

/**
 * Test set for PUT verb
 */
describe("Test PUT /review/", () => {
  beforeAll(() => {
    //create base data to be edited
    return request(baseAPIURL)
      .post("/review/" + newProductToAdd_OK.productID)
      .send(newProductToAdd_OK)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==");
  });
  afterAll(() => {
    //cleanse created entry to test PUT methods
    return request(baseAPIURL)
      .delete("/review/" + newProductToAdd_OK.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==");
  });
  test("check PUT new Data fails auth", () => {
    return request(baseAPIURL)
      .put("/review/" + ProductToUpdate_OKUpdate.productID)
      .send(ProductToUpdate_OKUpdate)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("error");
      });
  });
  test("check PUT new Data success", () => {
    return request(baseAPIURL)
      .put("/review/" + ProductToUpdate_OKUpdate.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .send(ProductToUpdate_OKUpdate)
      .then((response) => {
        expect(response.statusCode).toBe(204);
        expect(JSON.stringify(response.body)).toBe("{}");
      });
  });
  test("check PUT new Data fail no data sent", () => {
    return request(baseAPIURL)
      .put("/review/" + ProductToUpdate_OKUpdate.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .then((response) => {
        debugger;
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });
  test("check PUT new Data fails - Item to update not found", () => {
    return request(baseAPIURL)
      .put("/review/" + "aNonExistingInDBproductID")
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .send(ProductToUpdate_OKUpdate)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error");
      });
  });
  test("check PUT new Data fails - AvgReviews min constraint", () => {
    return request(baseAPIURL)
      .put("/review/" + ProductToUpdate_FailConstraint.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .send(ProductToUpdate_FailConstraint)
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });
  test("check PUT new Data fails - AvgReviews max constraint", () => {
    return request(baseAPIURL)
      .put("/review/" + ProductToUpdate_FailConstraint2.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .send(ProductToUpdate_FailConstraint2)
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });
  test("check PUT new Data fails - NumReviews min constraint", () => {
    debugger;
    return request(baseAPIURL)
      .put("/review/" + ProductToUpdate_FailConstraint3.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .send(ProductToUpdate_FailConstraint3)
      .then((response) => {
        debugger;
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });
  test("check PUT new Data fails - NumReviews must be integer", () => {
    debugger;
    return request(baseAPIURL)
      .put("/review/" + ProductToUpdate_FailConstraint3.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .send(ProductToUpdate_FailConstraint4)
      .then((response) => {
        debugger;
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");
      });
  });
});
/**
 * Test set for PUT verb
 */
describe("Test PUT /review/", () => {
  beforeAll(() => {
    //create base data to be edited
    return request(baseAPIURL)
      .post("/review/" + newProductToAdd_OK.productID)
      .send(newProductToAdd_OK)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==");
  });
  afterAll(() => {
  });
  test("check DELETE Data success", () => {
    return request(baseAPIURL)
      .delete("/review/" + newProductToAdd_OK.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .then((response) => {
        expect(response.statusCode).toBe(204);
        expect(JSON.stringify(response.body)).toBe("{}");
      });
  });
  test("check DELETE Data fails not found", () => {
    return request(baseAPIURL)
      .delete("/review/" + newProductToAdd_OK.productID)
      .set("Authorization", "Basic amNhc3RpbGxvOlN0YXJ0XzEyMw==")
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error");
      });
  });
  test("check DELETE Data Auth missing", () => {
    return request(baseAPIURL)
      .delete("/review/" + newProductToAdd_OK.productID)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("error");
      });
  });
});
