import { Application, NextFunction, Request, Response } from "express";
import { User, UserModel } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config";
import verifyAuthToken from "../middleware/auth";

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
  const user: User = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };

  try {
    const newUser = await userModel.create(user);
    const token = jwt.sign(
      { user: newUser },
      config.tokenSecret as unknown as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const authenticatedUser = await userModel.authenticate(username, password);
    res.json(authenticatedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: Application) => {
  app.get("/users", verifyAuthToken, index);
  app.post("/users", create);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users/authenticate", authenticate);
};

export default userRoutes;
