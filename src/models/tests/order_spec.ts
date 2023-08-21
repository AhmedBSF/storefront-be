import { OrderModel } from "../order";
import { UserModel } from "../user";

const orderModel = new OrderModel();
const userModel = new UserModel();

describe("OrderModel", () => {
  it("should have an index method", () => {
    expect(orderModel.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(orderModel.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(orderModel.create).toBeDefined();
  });

  it("create method should create an order", async () => {
    const user = await userModel.create({
      first_name: "John",
      last_name: "Doe",
      password: "password",
    });
    const result = await orderModel.create({
      user_id: user.id as number,
      status: "PENDING",
    });
    expect(result.id).toEqual(1);
  });

  it("index method should return a list of orders", async () => {
    const result = await orderModel.index();
    expect(result).toEqual([...result]);
  });

  it("show method should return the correct order", async () => {
    const result = await orderModel.show(1);
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: "PENDING",
    });
  });
});
