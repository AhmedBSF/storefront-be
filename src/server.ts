import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(config.port, function () {
  console.log(`starting app on : ${config.port}`);
});
