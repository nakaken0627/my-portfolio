import express from "express";
import * as dotenv from "dotenv";

import type { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
