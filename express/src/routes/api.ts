import express, { Request, Response } from "express";
import findCompanyController from "../../controllers/findProductControlling.js";

//routerオブジェクトを設定
const router = express.Router();

//対象のルートにリクエストが来た際の処理
router.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express!!" });
});

//フロントのリクエストにある企業IDから商品一覧を一括取得するAPI
router.get("/mycompany", findCompanyController.findProducts);

export default router;
