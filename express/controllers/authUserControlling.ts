import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel.js";
import passport from "../config/passport.js";

class AuthUserController {
  async signup(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    // console.log(username, password);

    try {
      //ユーザー名の重複確認
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

  async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("user-local", (err: Error, getUser: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!getUser) {
        console.log(getUser);
        return res.status(401).json({
          message: "認証に失敗しました",
          error: info.message || "認証が無効です",
        });
      }
      req.login(getUser, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          message: "認証に成功しました",
          user: {
            id: getUser.id,
            name: getUser.name,
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

      //ログアウトだけではsession情報はサーバに残るため削除が必要
      //sessionが残ることでサーバ側のメモリリークの原因となるため削除
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }

        //ログアウト時にブラウザ側にcookieでログインに関わるsidが残らないようにクリアする
        //cookieをセットした時と同じ属性にしないと削除に失敗することがあるため、httpOnlyやsecureも設定
        res.clearCookie("connect.sid", {
          path: "/",
          httpOnly: true,
          secure: false, //本番ではtrue
        });
        console.log("[authUserControlling]:logout:ログアウトしました");
        res.status(200).json({ message: "ログアウトしました" });
      });
    });
  }
}

export default new AuthUserController();
