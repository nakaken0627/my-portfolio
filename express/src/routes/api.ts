import express from "express";

import { upload } from "../config/upload.js";
import {
  addProductForCompany,
  changStatusOfConfirm,
  checkoutUserCart,
  confirmedOrderList,
  createOrUpdateUserCartProduct,
  deleteCustomProduct,
  deleteCustomProductsForCompany,
  deleteProductsForCompany,
  deleteUserCartALLProducts,
  deleteUserCartProduct,
  fetchAllProductsForUser,
  fetchDisplayProductsByCompany,
  fetchDisplayProductsForUser,
  findProductsForCompany,
  getOrCreateCart,
  getTotalProductsCount,
  getUserCartALLProducts,
  getUserList,
  orderHistory,
  orderListForCompany,
  registerCustomProduct,
} from "../controllers//productControlling.js";
import { getMyCompany } from "../controllers/authCompanyControlling.js";
import { getMyUser } from "../controllers/authUserControlling.js";

//routerオブジェクトを設定
const router = express.Router();

//問屋用のAPI
router.get("/company/profile", getMyCompany);
router.get("/company/users", getUserList);
router.get("/company/products", findProductsForCompany); //使ってなさそう
router.get("/company/products/custom", fetchDisplayProductsByCompany);
router.get("/company/orders", orderListForCompany);
router.get("/company/orders/confirmed", confirmedOrderList);

router.post("/company/products", upload.fields([{ name: "image", maxCount: 1 }]), addProductForCompany);
router.post("/company/custom-products", registerCustomProduct);

router.patch("/company/orders/confirmed", changStatusOfConfirm);

router.delete("/company/products", deleteProductsForCompany);
router.delete("/company/custom-products", deleteCustomProductsForCompany);
router.delete("/company/custom-product", deleteCustomProduct);

//発注者用API
router.get("/user/profile", getMyUser);
router.get("/user/products", fetchAllProductsForUser);
router.get("/user/orders/history", orderHistory);
router.get("/user/products/custom", fetchDisplayProductsForUser);
router.get("/user/products/count", getTotalProductsCount);

//カート機能
router.get("/cart", getOrCreateCart); //use
router.get("/cart/products", getUserCartALLProducts);
router.put("/cart/product", createOrUpdateUserCartProduct);
router.post("/cart/checkout", checkoutUserCart);
router.delete("/cart/products", deleteUserCartProduct);
router.delete("/cart/all-products", deleteUserCartALLProducts);

export default router;
