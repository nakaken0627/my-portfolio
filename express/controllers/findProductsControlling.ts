import { Request, Response, NextFunction } from "express";
import CompanyModel, { Company } from "../models/companyModel.js";

//companyに関連することを明示的にするためにRequestを拡張
export interface AuthCompanyRequest extends Request {
  user?: Company;
}

class AuthController {
  findProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: "認証に失敗しました" });
      return;
    }

    const companyReq = req as AuthCompanyRequest; //Request型に直接AuthCompanyRequestと指定するとエラーになるため、ここでAuthCompanyRequest型にキャスト

    const companyId = companyReq.user?.id; //認証後に予期せぬエラー(passportの設定ミスや不具合など)があった際にundefinedになる可能性があるため？は必要

    if (!companyId) {
      console.log("[findProductControlling]companyID:", companyId);
      res.status(400).json({ message: "会社IDが見つかりません" });
      return; //return res ...とするとexpressのRequestHandlerとして型が認識されず、エラーとなる
    }
    try {
      const products = await CompanyModel.findCompanyProducts(companyId);
      // console.log("[findProductControlling]products:", products);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: "サーバエラー", err });
      next(err);
    }
  };

  addProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.body) {
      console.log("[findProductsControlling]addProduct:データがありません");
      return;
    }
    const { company_id, model_number, name, price, description } = req.body;

    try {
      const result = await CompanyModel.addCompanyProduct(company_id, model_number, name, price, description);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "サーバエラー", err });
      next(err);
    }
  };
}
export default new AuthController();
