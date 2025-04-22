//フロントエンドからのリクエストに対する処理を記載

import { Request, Response, NextFunction } from "express";
import companyModel from "../models/companyModel.js";

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
}

export default new AuthController();
