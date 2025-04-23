//認証方法の定義、セッションへの保存

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "./database.js";

const passportUser = passport;

passportUser.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    //※passportの標準であるusername,password以外を指定する場合は、
    // passportCompanyで記載のように、usernameFieldとpasswordFieldを設定しないとエラーになる

    // console.log(username, password);

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
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

//セッションへ保存する情報を定義
passportUser.serializeUser((user, done) => {
  // const data = {
  // id: (user as AuthUser).id, //userにExpress.User型が適用されエラーが発生するため、User型を持つAuthUserにキャスト
  // type: "user",
  // };
  done(null, (user as { id: number }).id);
});

//センションからユーザー情報を復元
passportUser.deserializeUser(async (id: number, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const data = result.rows[0];
    if (data) {
      done(null, data);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});

export default passport;
