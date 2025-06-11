import express from "express";

// import { getMyCompany } from "../../.controllers/auth/authCompanyControlling.js";
// import { getMyUser } from "../../.controllers/auth/authUserControlling.js";
import "../../.controllers/.productControlling.js"; // addProductForCompany,

// changStatusOfConfirm,
// checkoutUserCart,
// confirmedOrderList,
// createOrUpdateUserCartProduct,
// deleteCustomProduct,
// deleteCustomProductsForCompany,
// deleteProductsForCompany,
// deleteUserCartALLProducts,
// deleteUserCartProduct,
// fetchAllProductsForUser,
// fetchDisplayProductsByCompany,
// fetchDisplayProductsForUser,
// findProductsForCompany,
// getOrCreateCart,
// getTotalProductsCount,
// getUserCartALLProducts,
// getUserList,
// orderHistory,
// orderListForCompany,
// registerCustomProduct,

import { upload } from "../../shared/config/upload.js";
import { fetchOrders, updateConfirmOrders } from "../controllers/company/orderController.js";
import {
  createCustomProduct,
  createProduct,
  deleteCustomProduct,
  deleteCustomProducts,
  deleteProducts,
  // createProductForCompany,
  fetchDisplayProducts,
  getUserList,
  // registerCustomProduct,
  // registerProductForCompany,
} from "../controllers/company/productController.js";
import {
  checkoutUserCart,
  createOrUpdateUserCartProduct,
  deleteUserCartALLProducts,
  deleteUserCartProduct,
  fetchUserCartProducts,
  getOrCreateCart,
} from "../controllers/user/cartController.js";
import { fetchUserOrders } from "../controllers/user/orderController.js";
import { fetchAllProductsWithCustom, fetchPaginatedProducts } from "../controllers/user/productController.js";

//routerオブジェクトを設定
const router = express.Router();

//問屋用のAPI
// router.get("/company/profile", getMyCompany);
router.get("/company/users", getUserList); //済
// router.get("/company/products", findProductsForCompany);//使ってなさそう
router.get("/company/products/custom", fetchDisplayProducts); //済
router.get("/company/orders", fetchOrders); //済
// router.get("/company/orders/confirmed", confirmedOrderList); //使ってなさそう

router.post("/company/products", upload.fields([{ name: "image", maxCount: 1 }]), createProduct); //済
router.post("/company/products/custom", createCustomProduct); //済

router.patch("/company/orders/confirmed", updateConfirmOrders); //済

router.delete("/company/products", deleteProducts); //済
router.delete("/company/products/custom", deleteCustomProducts); //済
router.delete("/company/product/custom", deleteCustomProduct); //済

//発注者用API
// router.get("/user/profile", getMyUser);
router.get("/user/products", fetchAllProductsWithCustom); //済
router.get("/user/products/custom", fetchPaginatedProducts); //済
router.get("/user/orders/history", fetchUserOrders); //済
// router.get("/user/products/count", getTotalProductsCount); //使っていない

//カート機能
router.get("/cart", getOrCreateCart); //済
router.get("/cart/products", fetchUserCartProducts); //済
router.put("/cart/product", createOrUpdateUserCartProduct); //済
router.post("/cart/checkout", checkoutUserCart); //済
router.delete("/cart/products", deleteUserCartProduct); //済
router.delete("/cart/products/all", deleteUserCartALLProducts); //済

export default router;
