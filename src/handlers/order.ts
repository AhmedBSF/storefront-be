import { Application, NextFunction, Request, Response } from "express";
import { Order, OrderModel, OrderProduct } from "../models/order";
import verifyAuthToken from "../middleware/auth";

const ordertModel = new OrderModel();

const index = async (_req: Request, res: Response) => {
  const orders = await ordertModel.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await ordertModel.show(parseInt(req.params.id));
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const newOrder = await ordertModel.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addToOrder = async (req: Request, res: Response) => {
  const orderProduct: OrderProduct = {
    product_id: req.body.product_id,
    order_id: req.body.order_id,
    quantity: req.body.quantity,
  };
  try {
    const newOrderProduct = await ordertModel.addToOrder(orderProduct);
    res.json(newOrderProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.post("/orders", verifyAuthToken, create);
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders/add", verifyAuthToken, addToOrder);
};

export default orderRoutes;
