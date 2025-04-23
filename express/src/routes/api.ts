import express, { Request, Response } from "express";
import ProductController from "../../controllers/productControlling.js";
import authCompanyController from "../../controllers/authCompanyControlling.js";
import authUserController from "../../controllers/authUserControlling.js";

//routerオブジェクトを設定
const router = express.Router();

//対象のルートにリクエストが来た際の処理
router.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express!!" });
});

//問屋用のAPI
router.get("/company/mycompany", authCompanyController.getMyCompany);
router.get("/company/myproductlist", ProductController.findProductsForCompany);
router.post("/company/addproduct", ProductController.addProductForCompany);
router.post("/company/deleteproducts", ProductController.deleteProductsForCompany);

//発注者用API
router.get("/user/myuser", authUserController.getMyUser);
router.get("/user/productlist", ProductController.findProductsFromUser);

export default router;
