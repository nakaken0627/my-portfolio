import { Request, Response, NextFunction } from "express";
import CompanyModel from "../models/companyModel.js";
import userModel from "../models/userModel.js";
import {
  getCart,
  createCart,
  getCartALLProducts,
  findCartProduct,
  createCartProduct,
  changeCartProduct,
  deleteCartProduct,
  deleteCartAllProducts,
  checkoutCart,
} from "../models/cartModel.js";

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

export const getOrCreateCart = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.body;

  try {
    const data = await getCart(user_id);
    if (!data) {
      const newCart = await createCart(user_id);
      res.status(200).json(newCart);
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "サーバでエラーが発生しました", err });
    return next(err);
  }
};

export const getUserCartALLProducts = async (req: Request, res: Response, next: NextFunction) => {
  const { cart_id } = req.body;
  try {
    const data = await getCartALLProducts(cart_id);
    if (!data) {
      res.status(400).json({ message: "データが見つかりません" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "サーバエラーが発生しました", err });
    next(err);
  }
};

export const createOrChangeUserCartProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { cart_id, product_id, quantity } = req.body;
  try {
    const data = await findCartProduct(cart_id, product_id);
    if (!data) {
      const newData = await createCartProduct(cart_id, product_id, quantity);
      res.status(200).json(newData);
    } else {
      const changeData = await changeCartProduct(cart_id, product_id, quantity);
      res.status(200).json(changeData);
    }
  } catch (err) {
    res.status(500).json({ message: "サーバエラーが発生しました", err });
    return next(err);
  }
};

export const deleteUserCartProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { cart_id, product_id } = req.body;
  try {
    const data = await deleteCartProduct(cart_id, product_id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "サーバエラーが発生しました", err });
    return next(err);
  }
};

export const deleteUserCartALLProducts = async (req: Request, res: Response, next: NextFunction) => {
  const { cart_id } = req.body;
  try {
    const data = await deleteCartAllProducts(cart_id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "サーバエラーが発生しました", err });
    return next(err);
  }
};

export const checkoutUserCart = async (req: Request, res: Response, next: NextFunction) => {
  const { cart_id } = req.body;
  try {
    const data = await checkoutCart(cart_id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "サーバエラーが発生しました", err });
    return next(err);
  }
};
