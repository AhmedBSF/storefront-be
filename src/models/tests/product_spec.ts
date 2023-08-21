import { ProductModel } from "../product";

const model = new ProductModel();

describe("ProductModel", () => {
  it("should have an index method", () => {
    expect(model.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(model.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(model.create).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await model.create({
      name: "Macbook Pro",
      price: "1200",
      category: "Electronics",
    });
    expect(result).toEqual({
      id: 1,
      name: "Macbook Pro",
      price: "1200",
      category: "Electronics",
    });
  });

  it("index method should return a list of products", async () => {
    const result = await model.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "Macbook Pro",
        price: "1200",
        category: "Electronics",
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const result = await model.show(1);
    expect(result).toEqual({
      id: 1,
      name: "Macbook Pro",
      price: "1200",
      category: "Electronics",
    });
  });
});
