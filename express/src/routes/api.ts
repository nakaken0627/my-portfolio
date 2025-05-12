import express from "express";

import { getMyCompany } from "../../controllers/authCompanyControlling.js";
import { getMyUser } from "../../controllers/authUserControlling.js";
import {
  addProductForCompany,
  changStatusOfConfirm,
  checkoutUserCart,
  confirmedOrderList,
  createOrChangeUserCartProduct,
  deleteProductsForCompany,
  deleteUserCartALLProducts,
  deleteUserCartProduct,
  findProductsForCompany,
  findProductsFromUser,
  getOrCreateCart,
  getUserCartALLProducts,
  orderHistory,
  orderListForCompany,
} from "../../controllers/productControlling.js";

//routerオブジェクトを設定
const router = express.Router();

//問屋用のAPI
router.get("/company/mycompany", getMyCompany);
router.get("/company/myproductlist", findProductsForCompany);
router.get("/company/getmyorderlist", orderListForCompany);
router.get("/company/confirmedorder", confirmedOrderList);
router.post("/company/addproduct", addProductForCompany);
router.patch("/company/confirmorder", changStatusOfConfirm);
router.delete("/company/deleteproducts", deleteProductsForCompany);

//発注者用API
router.get("/user/myuser", getMyUser);
router.get("/user/productlist", findProductsFromUser);
router.get("/user/orderhistory", orderHistory);

//カート機能
router.get("/cart/mycart", getOrCreateCart);
router.get("/cart/getproducts", getUserCartALLProducts);
router.put("/cart/product/:productId", createOrChangeUserCartProduct);
router.post("/cart/checkout", checkoutUserCart);
router.delete("/cart/deleteproduct", deleteUserCartProduct);
router.delete("/cart/deleteallproducts", deleteUserCartALLProducts);

export default router;
