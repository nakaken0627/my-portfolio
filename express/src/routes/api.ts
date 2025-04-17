import express, { Request, Response } from "express";

//routerオブジェクトを設定
const router = express.Router();

//対象のルートにリクエストが来た際の処理
router.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express!!" });
});

router.get("/mycompany", (req, res) => {
  // console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: "認証に失敗しました" });
  }
  res.status(200).json(req.user);
});

export default router;
