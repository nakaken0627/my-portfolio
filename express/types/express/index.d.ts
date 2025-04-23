import { Company } from "../../models/companyModel.js";
import { User } from "../../models/userModel.js";

declare global {
  namespace Express {
    interface User {
      id: number;
      type: "company" | "user";
    }
  }
  type AuthCompany = Company;
  type AuthUser = User;
}

export {};
