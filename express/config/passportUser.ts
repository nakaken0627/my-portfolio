//認証方法の定義、セッションへの保存

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "./database.js";

const passportUser = passport;

passportUser.use(
  new LocalStrategy(async (inputName: string, inputPassword: string, done) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE name = $1", [inputName]);
      const user = result.rows[0];

      if (!user) {
        return done(null, false, { message: "ユーザー名が間違っています" });
      }
      const isPasswordValid = await bcrypt.compare(inputPassword, user.password);

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
passportUser.serializeUser((user, done) => {
  const data = {
    id: (user as AuthUser).id,
    type: "user",
  };
  done(null, data);
});

//センションからユーザー情報を復元
passportUser.deserializeUser(async (id: number, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = result.rows[0];
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});

export default passport;
