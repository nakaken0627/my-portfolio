import express from "express";
import ProductController, {
  getOrCreateCart,
  getUserCartALLProducts,
  createOrChangeUserCartProduct,
  deleteUserCartProduct,
  deleteUserCartALLProducts,
  checkoutUserCart,
  orderHistory,
  orderListForCompany,
  changStatusOfConfirm,
  confirmedOrderList,
} from "../../controllers/productControlling.js";
import authCompanyController from "../../controllers/authCompanyControlling.js";
import authUserController from "../../controllers/authUserControlling.js";

//routerオブジェクトを設定
const router = express.Router();

//問屋用のAPI
router.get("/company/mycompany", authCompanyController.getMyCompany);
router.get("/company/myproductlist", ProductController.findProductsForCompany);
router.get("/company/getmyorderlist", orderListForCompany);
router.get("/company/confirmedorder", confirmedOrderList);
router.post("/company/addproduct", ProductController.addProductForCompany);
router.patch("/company/confirmorder", changStatusOfConfirm);
router.delete("/company/deleteproducts", ProductController.deleteProductsForCompany);

//発注者用API
router.get("/user/myuser", authUserController.getMyUser);
router.get("/user/productlist", ProductController.findProductsFromUser);
router.get("/user/orderhistory", orderHistory);

//カート機能
router.get("/cart/mycart", getOrCreateCart);
router.get("/cart/getproducts", getUserCartALLProducts);
router.put("/cart/product/:productId", createOrChangeUserCartProduct);
router.post("/cart/checkout", checkoutUserCart);
router.delete("/cart/deleteproduct", deleteUserCartProduct);
router.delete("/cart/deleteallproducts", deleteUserCartALLProducts);

export default router;
