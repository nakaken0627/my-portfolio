import express, { Request, Response, NextFunction } from "express";
import AuthCompanyController from "../../controllers/authCompanyControlling.js";
import passportCompany from "../../config/passportCompany.js";
import AuthUserController from "../../controllers/authUserControlling.js";

const router = express.Router();

router.post("/company/signup", AuthCompanyController.signup);

router.post("/company/login", (req: Request, res: Response, next: NextFunction) => {
  passportCompany.authenticate("local", (error: Error, getCompany: any, info: any) => {
    if (error) {
      return next(error);
    }
    if (!getCompany) {
      return res.status(401).json({
        message: "認証に失敗しました",
        error: info?.massage || "認証が無効です",
      });
    }
    req.logIn(getCompany, (error) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json({
        massage: "ログインに成功しました",
        company: {
          id: getCompany.id,
          name: getCompany.name,
        },
      });
    });
  })(req, res, next);
});

router.get("/company/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true, //jsから悪意を持ってcookieを取得するのを防ぐために必要
        secure: false, // HTTPSで通信があった際に実行する ※本番環境では true にする必要がある
      });
      res.status(200).json({ message: "ログアウトしました" });
    });
  });
});

router.post("/user/signup", AuthUserController.signup);

router.post("/user/login", AuthUserController.login);

router.get("/user/logout", AuthUserController.logout);

export default router;
