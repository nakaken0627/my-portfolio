/// <reference path="../@types/express/globals.d.ts" />

//認証方法の定義、セッションへの保存
import * as bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import pool from "./database.js";

//companyの認証のためローカル戦略を使って定義
passport.use(
  "company-local",
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      //ユーザー名がDBの値と一致するか確認、不一致の場合はメッセージを返す
      const result = await pool.query("SELECT * FROM companies WHERE name = $1", [username]);
      const company = result.rows[0];
      if (!company) {
        return done(null, false, { message: "ユーザー名が間違っています" });
      }

      //bcryptのcompare関数を使って、入力した値とハッシュ化されたパスワードが一致するか確認
      //不一致の場合はメッセージを返す
      const isPasswordValid = await bcrypt.compare(password, company.password);
      if (!isPasswordValid) {
        return done(null, false, { message: "パスワードが間違っています" });
      }

      //問題がなければDBで取得したユーザー情報を返す
      return done(null, { ...company, type: "company" });
    } catch (error) {
      return done(error);
    }
  }),
);

//userの認証のためローカル戦略を使って定義
passport.use(
  "user-local",
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      //ユーザー名がDBの値と一致するか確認、不一致の場合はメッセージを返す
      const result = await pool.query("SELECT * FROM users WHERE name = $1", [username]);
      const user = result.rows[0];
      if (!user) {
        return done(null, false, { message: "ユーザー名が間違っています" });
      }

      //bcryptのcompare関数を使って、入力した値とハッシュ化されたパスワードが一致するか確認
      //不一致の場合はメッセージを返す
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done(null, false, { message: "パスワードが間違っています" });
      }

      //問題がなければDBで取得したユーザー情報を返す
      return done(null, { ...user, type: "user" });
    } catch (error) {
      return done(error);
    }
  }),
);

//セッションへ保存する情報を定義
passport.serializeUser((user: Express.User, done) => {
  const expressUser = user as Express.User;
  done(null, { id: expressUser.id, type: expressUser.type });
});

//センションからユーザー情報を復元
passport.deserializeUser(async (data: Express.User, done) => {
  const expressData = data as Express.User;
  try {
    if (expressData.type === "company") {
      const result = await pool.query("SELECT * FROM companies WHERE id = $1", [expressData.id]);
      return done(null, { ...result.rows[0], type: "company" });
    } else if (expressData.type === "user") {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [expressData.id]);
      return done(null, { ...result.rows[0], type: "user" });
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error);
  }
});

export default passport;
