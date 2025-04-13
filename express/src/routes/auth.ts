import express, { NextFunction } from "express";
import AuthController from "../../controllers/authControlling";
import passport from "../../config/passport";
import { Request, Response } from "express";

const router = express.Router();

router.post("/signup", AuthController.signup);

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (error: Error, user: any, info: any) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).json({
        message: "認証に失敗しました",
        error: info?.massage || "Invalid credentials",
      });
    }
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json({
        massage: "ログイン成功",
        user: {
          id: user.id,
          name: user.username,
        },
      });
    });
  })(req, res, next);
});
export default router;
