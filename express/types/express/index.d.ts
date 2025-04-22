import { Company } from "../../models/companyModel.js";
import { User } from "../../models/userModel.js";

declare global {
  namespace Express {
    interface User {} //User型とCompany型が競合してしまうため、Express.User型を空にしている。
  }
  type AuthCompany = Company;
  type AuthUser = User;
}

export {};
