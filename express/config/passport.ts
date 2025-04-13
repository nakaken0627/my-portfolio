//認証方法の定義、セッションへの保存

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "./database";

passport.use(
  new LocalStrategy(async (username: string, password: string, done: any) => {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = result.rows[0];

      if (!user) {
        return done(null, false, { message: "ユーザー名が間違っています" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { message: "パスワードが間違っています" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

//セッションへ保存する情報を定義
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

//センションからユーザー情報を復元
passport.deserializeUser(async (id: number, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = result.rows[0];
    if (user) {
      done(null, user as Express.User);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});

export default passport;
