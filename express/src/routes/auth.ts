//passportをuser用とcompany用に分けたことにより、分岐処理がうまくいかず、
//エラがー発生したため、一旦企業側のサインアップ処理に必要な機能のみを表示

import express from "express"; //company用のサインアップ機能の確認のために一旦退避{ NextFunction }
// import AuthController from "../../controllers/authControlling.js";
import AuthCompanyController from "../../controllers/authCompanyControlling.js";
// import passportCompany from "../../config/passportCompany.js";
// import passport from "../../config/passport.js";
// import { Request, Response } from "express";

const router = express.Router();

router.post("/company/signup", AuthCompanyController.signup);

//user用サインアップ機能のため、一旦影響が出ないよう対象外
// router.post("/signup", AuthController.signup);

// user用ログイン機能のため、一旦影響が出ないよう対象外
// router.post("/login", (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate("local", (error: Error, user: any, info: any) => {
//     if (error) {
//       return next(error);
//     }
//     if (!user) {
//       return res.status(401).json({
//         message: "認証に失敗しました",
//         error: info?.massage || "Invalid credentials",
//       });
//     }
//     req.logIn(user, (error) => {
//       if (error) {
//         return next(error);
//       }
//       return res.status(200).json({
//         massage: "ログイン成功",
//         user: {
//           id: user.id,
//           name: user.username,
//         },
//       });
//     });
//   })(req, res, next);
// });

export default router;
