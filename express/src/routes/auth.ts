import express from "express";

import {
  login as userLogin,
  logout as userLogout,
  signup as userSignup,
} from "../controllers/authCompanyControlling.js";
import {
  login as companyLogin,
  logout as companyLogout,
  signup as companySignup,
} from "../controllers/authUserControlling.js";

const router = express.Router();

//company用
router.post("/company/signup", userSignup);
router.post("/company/login", userLogin);
router.get("/company/logout", userLogout);

//user用
router.post("/user/signup", companySignup);
router.post("/user/login", companyLogin);
router.get("/user/logout", companyLogout);

export default router;
