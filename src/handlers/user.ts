import { Application, NextFunction, Request, Response } from "express";
import { User, UserModel } from "../models/user";

const userModel = new UserModel();

const index = async (_req: Request, res: Response) => {
  const users = await userModel.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await userModel.show(parseInt(req.params.id));
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };

    const newUser = await userModel.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: Application) => {
  app.get("/users", index);
  app.post("/users", create);
  app.get("/users/:id", show);
};

export default userRoutes;
