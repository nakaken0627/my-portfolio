import express, { Request, Response } from "express";
import ProductController, {
  getOrCreateCart,
  getUserCartALLProducts,
  createOrChangeUserCartProduct,
  deleteUserCartProduct,
  // deleteUserCartALLProducts,
  // checkoutUserCart,
} from "../../controllers/productControlling.js";
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

//カート機能
router.post("/cart/mycart", getOrCreateCart);
router.post("/cart/getproducts", getUserCartALLProducts);
router.post("/cart/updataproduct", createOrChangeUserCartProduct);
router.post("/cart/deleteproduct", deleteUserCartProduct);
// router.post("/cart/deleteallproducts", deleteUserCartALLProducts);
// router.post("/cart/checkout", checkoutUserCart);

export default router;
