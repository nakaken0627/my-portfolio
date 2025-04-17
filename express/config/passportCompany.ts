//ユーザー登録後の認証方法の定義、セッションへの保存

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "./database.js";

const passportCompany = passport;

passportCompany.use(
  new LocalStrategy(
    {
      usernameField: "companyName",
      passwordField: "companyPassword",
    },
    async (companyName: string, companyPassword: string, done: any) => {
      try {
        const result = await pool.query("SELECT * FROM companies WHERE name = $1", [companyName]);
        const getCompany = result.rows[0];

        if (!getCompany) {
          return done(null, false, { message: "ユーザー名が間違っています" }); //userがない場合はリテラル型の”false”にすることで認証成功時にのみ別の方を適用する
        }
        const isPasswordValid = await bcrypt.compare(companyPassword, getCompany.password);

        if (!isPasswordValid) {
          return done(null, false, { message: "パスワードが間違っています" });
        }
        return done(null, getCompany);
      } catch (error) {
        return done(error);
      }
    }
  )
);

//セッションへ保存する情報を定義
passportCompany.serializeUser((company: any, done) => {
  const data = {
    id: company.id,
    type: "company",
  };
  done(null, data);
});

//センションからユーザー情報を復元
passport.deserializeUser(async (data: any, done) => {
  // console.log(typeof data, data);
  if (typeof data === "string") {
    try {
      data = JSON.parse(data); //もしJSON形式で保存されていた場合、オブジェクトに直す必要がある
    } catch (e) {
      return done(e);
    }
  }

  if (data.type !== "company") {
    return done(null, false);
  }
  try {
    const result = await pool.query("SELECT * FROM companies WHERE id = $1", [data.id]);
    const company = result.rows[0];
    if (company) {
      done(null, company);
    } else {
      done(null, false);
    }
  } catch (e) {
    done(e);
  }
});

export default passportCompany;
