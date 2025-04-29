//フロントエンドからのリクエストに対する処理を記載

import { Request, Response, NextFunction } from "express";
import companyModel from "../models/companyModel.js";
import passport from "../config/passport.js";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    // console.log("signup:", req.body);
    const { companyName, companyPassword } = req.body;
    // console.log(companyName, password);
    try {
      //ユーザーが存在しているかを確認
      const existingCompany = await companyModel.findByCompanyName(companyName);
      // console.log("existingCompany:", existingCompany);
      if (existingCompany) {
        res.status(409).json({ message: "企業名はすでに登録されています" });
        return;
      }
      //ユーザー登録
      const newCompany = await companyModel.createCompany(companyName, companyPassword);
      console.log("[authCompanyControlling]newCompany:", newCompany);

      // サインアップ後に自動的にログインする
      req.login(newCompany, (err) => {
        if (err) {
          return next(err);
        }
        res.status(201).json({
          message: "登録成功",
          company: {
            id: newCompany.id,
            companyName: newCompany.name,
          },
        });
      });
    } catch (error) {
      console.log("[authCompanyControlling]サインアップ処理エラー", error);
      res.status(500).json({ message: "サーバエラー" });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("company-local", (error: Error, getCompany: any, info: any) => {
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
  }

  async logout(req: Request, res: Response, next: NextFunction) {
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
  }

  async getMyCompany(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: "認証に失敗しました" });
    }
    res.status(200).json(req.user);
  }
}

export default new AuthController();
