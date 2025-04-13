//フロントエンドからのリクエストに対する処理を記載

import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    // console.log(req.body);
    const { username, password } = req.body;
    // console.log(username, password);
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
      // console.log(newUser);

      // サインアップ後に自動的にログインする
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        res.status(201).json({
          message: "登録成功",
          user: { id: newUser.id },
          username: newUser.username,
        });
      });
    } catch (error) {
      console.log("サインアップ処理エラー", error);
      res.status(500).json({ message: "サーバエラー" });
    }
  }

  // async signin(req: Request, res: Response, next: NextFunction) {
  //   const [username, password] = await req.body;
  //   const data = await userModel.comparePassword(username, password);
  // }
}

export default new AuthController();
