import express from "express";

import {
  login as companyLogin,
  logout as companyLogout,
  signup as companySignup,
  getMyCompany,
} from "../controllers/auth/authCompanyController.js";
import {
  getMyUser,
  login as userLogin,
  logout as userLogout,
  signup as userSignup,
} from "../controllers/auth/authUserController.js";

const router = express.Router();

//company用
router.post("/company/signup", companySignup);
router.post("/company/signin", companyLogin);
router.get("/company/logout", companyLogout);
router.get("/company/profile", getMyCompany);

//user用
router.post("/user/signup", userSignup);
router.post("/user/login", userLogin);
router.get("/user/logout", userLogout);
router.get("/user/profile", getMyUser);

export default router;
