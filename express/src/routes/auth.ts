import express from "express";
import AuthController from "../../controllers/authControlling";

const router = express.Router();

router.post("/", AuthController.signup);

export default router;
