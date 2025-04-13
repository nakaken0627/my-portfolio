import { User as UserModel } from "../../models/userModel";

declare global {
  namespace Express {
    interface User extends UserModel {} // UserModel のプロパティを継承
  }
}

declare module "express-serve-static-core" {
  interface Request {
    user?: Express.User; // Express.User 型を参照
    isAuthenticated(): boolean;
    logout(done: (err: any) => void): void;
    login(user: Express.User, done: (err: any) => void): void;
    login(user: Express.User, options: any, done: (err: any) => void): void;
  }
}
