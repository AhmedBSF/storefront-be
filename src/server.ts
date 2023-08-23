import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";
import userRoutes from "./handlers/user";
import productRoutes from "./handlers/product";
import orderRoutes from "./handlers/order";

const PORT = config.port;

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(PORT, function () {
  console.log(`starting app on : ${PORT}`);
});

export default app;
