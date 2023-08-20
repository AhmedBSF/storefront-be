import { UserModel } from "../user";

const model = new UserModel();

describe("UserModel", () => {
  it("should have an index method", () => {
    expect(model.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(model.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(model.create).toBeDefined();
  });

  it("create method should add a user", async () => {
    const result = await model.create({
      first_name: "John",
      last_name: "Doe",
      password: "password",
    });
    expect(result).toEqual({
      id: 1,
      first_name: "John",
      last_name: "Doe",
      password: "password",
    });
  });

  it("index method should return a list of users", async () => {
    const result = await model.index();
    expect(result).toEqual([
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        password: "password",
      },
    ]);
  });

  it("show method should return the correct user", async () => {
    const result = await model.show(1);
    expect(result).toEqual({
      id: 1,
      first_name: "John",
      last_name: "Doe",
      password: "password",
    });
  });
});
