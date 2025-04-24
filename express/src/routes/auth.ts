import express from "express";
import AuthCompanyController from "../../controllers/authCompanyControlling.js";
import AuthUserController from "../../controllers/authUserControlling.js";

const router = express.Router();

//company用
router.post("/company/signup", AuthCompanyController.signup);
router.post("/company/login", AuthCompanyController.login);
router.get("/company/logout", AuthCompanyController.logout);

//user用
router.post("/user/signup", AuthUserController.signup);
router.post("/user/login", AuthUserController.login);
router.get("/user/logout", AuthUserController.logout);

export default router;
