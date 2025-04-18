import { Company } from "../../models/companyModel.js";

declare global {
  namespace Express {
    interface Request {
      authCompany?: Company;
    }
  }
}

export {};
