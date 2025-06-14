import { NextFunction, Request, Response } from "express";

import passport from "../config/passport.js";
import { createCompany, findByCompanyName } from "../models/companyModel.js";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { companyName, companyPassword } = req.body;

  try {
    //ユーザーが存在しているかを確認
    const existingCompany = await findByCompanyName(companyName);
    if (existingCompany) {
      res.status(409).json({ message: "企業名はすでに登録されています" });
      return;
    }
    //ユーザー登録
    const newCompany = await createCompany(companyName, companyPassword);

    // サインアップ後に自動的にログインする
    req.logIn({ ...newCompany, type: "company" }, (err) => {
      if (err) {
        return next(err);
      }
      req.session.save(() => {
        res.status(201).json({
          message: "登録成功",
          company: {
            id: newCompany.id,
            companyName: newCompany.name,
          },
        });
      });
    });
  } catch (err) {
    res.status(500).json({ message: "サーバエラー" });
    console.error(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
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
        massage: "認証に成功しました",
        company: {
          id: getCompany.id,
          name: getCompany.name,
        },
      });
    });
  })(req, res, next);
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
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
};

export const getMyCompany = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: "認証に失敗しました" });
  }
  res.status(200).json(req.user);
};
