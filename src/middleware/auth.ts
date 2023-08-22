import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      jwt.verify(token, config.tokenSecret as unknown as string);
      next();
    } else {
      res.status(401).json("Invalid token");
    }
  } catch (error) {
    res.status(401);
  }
};

export default verifyAuthToken;
