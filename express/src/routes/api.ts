import express, { Request, Response } from "express";
import ProductController from "../../controllers/ProductControlling.js";

//routerオブジェクトを設定
const router = express.Router();

//対象のルートにリクエストが来た際の処理
router.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express!!" });
});

//問屋用のAPI

router.get("/company/mycompany", (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    // console.log("[api]api/mycompany:", req.isAuthenticated());
    res.status(401).json({ message: "認証に失敗しました" });
  }
  // console.log("[api]api/mycompany", req.user);
  res.status(200).json(req.user);
});

router.get("/company/myproductlist", ProductController.findProductsForCompany);
router.post("/company/addproduct", ProductController.addProductForCompany);
router.post("/company/deleteproducts", ProductController.deleteProductsForCompany);

//発注者用API
router.get("/user/myuser", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: "認証に失敗しました" });
  }
  res.status(200).json(req.user);
});

router.get("/user/productlist", ProductController.findProductsFromUser);

export default router;
