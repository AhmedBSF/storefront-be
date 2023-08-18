import { User, UserModel } from "../user";

const model = new UserModel();

describe("UserModel", () => {
  it("should have an index method", () => {
    expect(model.index).toBeDefined();
  });

  it("index method should return a list of users", async () => {
    const result = await model.index();
    expect(result).toEqual([]);
  });
});
