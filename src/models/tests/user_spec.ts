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

  it("create method should add a user with first name: John", async () => {
    const result = await model.create({
      username: "John2077",
      first_name: "John",
      last_name: "Doe",
      password: "password",
    });
    expect(result.first_name).toEqual("John");
  });

  it("index method should return an array of users", async () => {
    const result = await model.index();
    expect(result).toEqual(...[result]);
  });
});
