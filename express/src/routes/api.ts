import express, { Request, Response } from "express";
import findProdustsController from "../../controllers/findProductsControlling.js";

//routerオブジェクトを設定
const router = express.Router();

//対象のルートにリクエストが来た際の処理
router.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express!!" });
});

router.get("/mycompany", (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    // console.log("[api]api/mycompany:", req.isAuthenticated());
    res.status(401).json({ message: "認証に失敗しました" });
  }
  console.log("[api]api/mycompany", req.user);
  res.status(200).json(req.user);
});

//フロントのリクエストにある企業IDから商品一覧を一括取得するAPI
router.get("/myproducts", findProdustsController.findProducts);

export default router;
