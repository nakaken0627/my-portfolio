import express, { NextFunction } from "express";
import AuthController from "../../controllers/authControlling";
import passport from "../../config/passport";
import { Request, Response } from "express";

const router = express.Router();

router.post("/signup", AuthController.signup);

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    (error: Error, user: Express.User | false, info: any) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.status(401).json({
          message: "認証に失敗しました",
          error: info?.massage || "Invalid credentials",
        });
      }
      req.logIn(user, (error) => {
        if (error) {
          return next(error);
        }
        return res.status(200).json({
          massage: "ログイン成功",
          user: {
            id: (user as Express.User).id,
            name: (user as Express.User).username,
          },
        });
      });
    }
  )(req, res, next);
});
export default router;

//     successRedirect: "/auth/success",
//     failureRedirect: "/auth/failure",
//     failureFlash: true,
//   })
// );

// router.get("/success", (req, res) => {
//   // console.log(res.status(200));
//   res.status(200).json({
//     message: "ログイン成功",
//     //型アサーションを使用せずに実装するためにはどうしたらいいのか？
//     user: { id: (req.user as any).id, name: (req.user as any).username },
//   });
// });

// router.get("/failure", (req, res) => {
//   res.status(401).json({
//     message: "認証に失敗しました",
//     //型アサーションを使用せずに実装するためにはどうしたらいいのか？
//     error: (req.session as any).messages?.[0],
//   });
// });
