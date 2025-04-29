import { Request, Response, NextFunction } from "express";
import CompanyModel, { getMyOrderList, confirmingOrder, getConfirmedOrderList } from "../models/companyModel.js";
import userModel, { orderedProductList } from "../models/userModel.js";
import { createOrder, createOrderProduct } from "../models/orderModel.js";
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
      return;
    }
    try {
      const products = await CompanyModel.findCompanyProducts(companyId);
      res.status(200).json(products);
    } catch (err) {
      return next(err);
    }
  };

  addProductForCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.body) {
      return;
    }
    const { company_id, model_number, name, price, description } = req.body;

    try {
      const result = await CompanyModel.addCompanyProduct(company_id, model_number, name, price, description);
      res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  deleteProductsForCompany = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      return;
    }

    const { companyId, productsIds } = req.body;
    // console.log(`ProductControlling:companyId:${companyId},productsIds:${productsIds}`);

    try {
      const result = await CompanyModel.deleteCompanyProducts(companyId, productsIds);
      res.status(200).json({ message: "[ProductControlling]deleteProducts:削除が成功しました", result });
    } catch (err) {
      return next(err);
    }
  };

  findProductsFromUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await userModel.findProductsForUser();
      res.status(200).json(data);
    } catch (err) {
      return next(err);
    }
  };
}

export default new ProductController();

export const getOrCreateCart = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.user_id;
  try {
    const data = await getCart(userId);
    if (!data) {
      const newCart = await createCart(userId);
      res.status(200).json(newCart);
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const getUserCartALLProducts = async (req: Request, res: Response, next: NextFunction) => {
  const cartId = req.body.cart_id;
  try {
    const data = await getCartALLProducts(cartId);
    if (!data) {
      res.status(404).json({ message: "データが見つかりません" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    return next(err);
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
    return next(err);
  }
};

export const deleteUserCartProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { cart_id, product_id } = req.body;
  try {
    const data = await deleteCartProduct(cart_id, product_id);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const deleteUserCartALLProducts = async (req: Request, res: Response, next: NextFunction) => {
  const { cart_id } = req.body;
  try {
    const data = await deleteCartAllProducts(cart_id);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const checkoutUserCart = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id, cart_id, cartProducts } = req.body;
  try {
    const order = await createOrder(user_id);
    const order_id = order.id;
    await checkoutCart(order_id, cart_id);
    await createOrderProduct(order_id, cartProducts);
    res.status(200).json(order);
  } catch (err) {
    return next(err);
  }
};

export const orderHistory = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.body;
  try {
    const data = await orderedProductList(user_id);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const orderListForCompany = async (req: Request, res: Response, next: NextFunction) => {
  const { company_id } = req.body;
  try {
    const data = await getMyOrderList(company_id);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const changStatusOfConfirm = async (req: Request, res: Response, next: NextFunction) => {
  const { confirmedIds } = req.body;
  try {
    const data = await confirmingOrder(confirmedIds);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const confirmedOrderList = async (req: Request, res: Response, next: NextFunction) => {
  const { company_id } = req.body;
  try {
    const data = await getConfirmedOrderList(company_id);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
