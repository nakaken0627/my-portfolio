import express from "express";

import { upload } from "../../shared/config/upload.js";
import { fetchOrders, updateConfirmOrders } from "../controllers/company/orderController.js";
import {
  createCustomProduct,
  createProduct,
  deleteCustomProduct,
  deleteCustomProducts,
  deleteProducts,
  fetchDisplayProducts,
  getUserList,
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

const router = express.Router();

//問屋用のAPI
router.get("/company/users", getUserList);
router.get("/company/products/custom", fetchDisplayProducts);
router.get("/company/orders", fetchOrders);

router.post("/company/products", upload.fields([{ name: "image", maxCount: 1 }]), createProduct);
router.post("/company/products/custom", createCustomProduct);

router.patch("/company/orders/confirmed", updateConfirmOrders);

router.delete("/company/products", deleteProducts);
router.delete("/company/products/custom", deleteCustomProducts);
router.delete("/company/product/custom", deleteCustomProduct);

//発注者用API
router.get("/user/products", fetchAllProductsWithCustom);
router.get("/user/products/custom", fetchPaginatedProducts);
router.get("/user/orders/history", fetchUserOrders);

//カート機能
router.get("/cart", getOrCreateCart);
router.get("/cart/products", fetchUserCartProducts);
router.put("/cart/product", createOrUpdateUserCartProduct);
router.post("/cart/checkout", checkoutUserCart);
router.delete("/cart/products", deleteUserCartProduct);
router.delete("/cart/products/all", deleteUserCartALLProducts);

export default router;
