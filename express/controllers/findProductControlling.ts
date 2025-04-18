import { Request, Response, NextFunction } from "express";
import CompanyModel, { Company } from "../models/companyModel.js";

interface AuthCompanyRequest extends Request {
  authCompany?: Company;
}

class AuthController {
  findProducts = async (req: AuthCompanyRequest, res: Response, next: NextFunction) => {
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: "認証に失敗しました" });
      return;
    }

    const companyId = req.authCompany?.id;

    if (!companyId) {
      console.log("[findProductControlling]companyID:", companyId);
      console.log("[findProductControlling]companyIDが見つかりません");
      res.status(400).json({ message: "会社IDが見つかりません" });
      return; //returnは最後に個別に記載することでexpressのRequestHandlerとして型が認識されるため、エラーを回避できる
    }
    try {
      console.log("ここまではきてます");
      const products = await CompanyModel.findCompanyProducts(companyId);
      console.log("[findProductControlling]products:", products);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: "サーバエラー", err });
      next(err);
    }
  };
}

export default new AuthController();
