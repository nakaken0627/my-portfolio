import { Request, Response, NextFunction } from "express";
import CompanyModel from "../models/companyModel.js";
import userModel from "../models/userModel.js";

class ProductController {
  findProductsForCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: "認証に失敗しました" });
      return;
    }

    const companyId = req.user.id;

    if (!companyId) {
      console.log("[ProductControlling]companyID:", companyId);
      res.status(400).json({ message: "会社IDが見つかりません" });
      return; //return res ...とするとexpressのRequestHandlerとして型が認識されず、エラーとなる
    }
    try {
      const products = await CompanyModel.findCompanyProducts(companyId);
      // console.log("[findProductControlling]products:", products);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: "[ProductControlling]companyID:サーバエラー", err });
      next(err);
    }
  };

  addProductForCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.body) {
      console.log("[ProductControlling]addProduct:データがありません");
      return;
    }
    const { company_id, model_number, name, price, description } = req.body;

    try {
      const result = await CompanyModel.addCompanyProduct(company_id, model_number, name, price, description);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "[ProductControlling]addProduct:サーバエラー", err });
      next(err);
    }
  };

  deleteProductsForCompany = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      console.log("[ProductControlling]deleteProducts:データがありません");
      return;
    }

    const { companyId, productsIds } = req.body;
    // console.log(`ProductControlling:companyId:${companyId},productsIds:${productsIds}`);

    try {
      const result = await CompanyModel.deleteCompanyProducts(companyId, productsIds);
      console.log("[ProductControlling]deleteProducts:", result);
      res.status(200).json({ message: "[ProductControlling]deleteProducts:削除が成功しました", result });
    } catch (err) {
      res.status(500).json({ message: "[ProductControlling]deleteProducts:サーバーエラー", err });
      next(err);
    }
  };

  findProductsFromUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await userModel.findProductsForUser();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: "サーバエラーが発生しました", err });
      return next(err);
    }
  };
}
export default new ProductController();
