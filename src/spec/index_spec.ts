import supertest from "supertest";
import app from "../server";
import { UserModel } from "../models/user";

const application = supertest(app);
const userModel = new UserModel();

let token: string, userId: number;

describe("API Endpoints", () => {
  beforeAll(async () => {
    const user = await userModel.create({
      username: "Doe2077",
      first_name: "John",
      last_name: "Doe",
      password: "password",
    });

    userId = user.id!;
  });

  describe("User endpoints", () => {
    it("should authenticate the user", async () => {
      const res = await application
        .post("/users/authenticate")
        .send({
          username: "Doe2077",
          password: "password",
        })
        .expect(200);
      token = res.body.data;
    });

    it("should test GET /users", () => {
      application
        .get("/users")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });

    it("should test GET /users/:id ", () => {
      application
        .get(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
  });

  describe("Product endpoints", () => {
    it("should test POST /products", () => {
      application
        .post("/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Far Cry 6",
          price: "35",
          category: "Video Games",
        })
        .expect(200);
    });

    it("should test GET /products", () => {
      application
        .get("/products")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });

    it("should test GET /products/:id ", () => {
      application
        .get("products/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
  });

  describe("Order endpoints", () => {
    it("should test POST /orders", () => {
      application
        .post("/orders")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: userId,
          status: "active",
        })
        .expect(200);
    });

    it("should test GET /orders", () => {
      application
        .get("/orders")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });

    it("should test GET /orders/:id ", () => {
      application
        .get("orders/1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });

    it("should test GET /orders/add ", () => {
      application
        .post("orders/add")
        .send({
          product_id: 1,
          order_id: 1,
          quantity: 1,
        })
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
  });
});
