import { Application, NextFunction, Request, Response } from "express";
import { Product, ProductModel } from "../models/product";
import verifyAuthToken from "../middleware/auth";

const productModel = new ProductModel();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await productModel.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await productModel.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
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
  app.post("/products", verifyAuthToken, create);
  app.get("/products/:id", show);
};

export default productRoutes;
