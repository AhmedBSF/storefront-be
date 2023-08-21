import { Application, NextFunction, Request, Response } from "express";
import { Product, ProductModel } from "../models/product";

const productModel = new ProductModel();

const index = async (_req: Request, res: Response) => {
  const products = await productModel.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await productModel.show(parseInt(req.params.id));
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct = await productModel.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: Application) => {
  app.get("/products", index);
  app.post("/products", create);
  app.get("/products/:id", show);
};

export default productRoutes;
