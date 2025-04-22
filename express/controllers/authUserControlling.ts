//フロントエンドからのリクエストに対する処理を記載

import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel.js";

class AuthUserController {
  async signup(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const { username, password } = req.body;
    console.log(username, password);
    try {
      //ユーザーが存在しているかを確認
      const existingUser = await userModel.findByUsername(username);
      console.log(existingUser);
      if (existingUser) {
        res.status(409).json({ message: "ユーザー名はすでに登録されています" });
        return;
      }
      //ユーザー登録
      const newUser = await userModel.createUser(username, password);
      console.log("[authUserControlling]newUser:", newUser);

      // サインアップ後に自動的にログインする
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        res.status(201).json({
          message: "ユーザー登録成功",
          id: newUser.id,
          username: newUser.name,
        });
      });
    } catch (error) {
      console.log("[authUserControlling]サインアップ処理エラー", error);
      res.status(500).json({ message: "[authUserControlling]サーバエラー" });
    }
  }
}

export default new AuthUserController();
