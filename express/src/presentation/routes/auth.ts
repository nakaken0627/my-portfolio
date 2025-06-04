import express from "express";

import {
  login as companyLogin,
  logout as companyLogout,
  signup as companySignup,
} from "../controllers/auth/authCompanyController.js";
import {
  login as userLogin,
  logout as userLogout,
  signup as userSignup,
} from "../controllers/auth/authUserController.js";

const router = express.Router();

//company用
router.post("/company/signup", companySignup);
router.post("/company/login", companyLogin);
router.get("/company/logout", companyLogout);

//user用
router.post("/user/signup", userSignup);
router.post("/user/login", userLogin);
router.get("/user/logout", userLogout);

export default router;
