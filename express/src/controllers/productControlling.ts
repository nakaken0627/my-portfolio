import { NextFunction, Request, Response } from "express";

import {
  changeCartProduct,
  checkoutCart,
  createCart,
  createCartProduct,
  deleteCartAllProducts,
  deleteCartProduct,
  findCartProduct,
  getCart,
  getCartALLProducts,
} from "../models/cartModel.js";
import {
  addCompanyProduct,
  addCustomProduct,
  confirmingOrder,
  deleteCompanyProduct,
  deleteCustomCompanyProduct,
  deleteCustomCompanyProducts,
  fetchMergedCompanyProducts,
  findCompanyProducts,
  getConfirmedOrderList,
  getMyOrderList,
  getUserIds,
} from "../models/companyModel.js";
import { createOrder, createOrderProduct } from "../models/orderModel.js";
import { findProductsForUser, orderedProductList } from "../models/userModel.js";
import { deleteImage, getSignedImageUrl, uploadImage } from "../services/s3Service.js";

export const findProductsForCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: "認証に失敗しました" });
    return;
  }

  const companyId = req.user.id;

  if (!companyId) {
    res.status(400).json({ message: "会社IDが見つかりません" });
    return;
  }
  try {
    const products = await findCompanyProducts(companyId);
    res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
};

export const addProductForCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.body || !req.user || !req.file) return;

  const company_id = String(req.user.id);
  const { model_number, name, price, description } = req.body;

  const imageName = await uploadImage(req.file);

  try {
    const data = await addCompanyProduct(company_id, model_number, name, price, description, imageName);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const deleteProductsForCompany = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || !req.user) return;

  const companyId = req.user.id;
  const { productsIds } = req.body;

  try {
    await Promise.all(
      productsIds.map(async (id: number) => {
        const result = await deleteCompanyProduct(companyId, id);
        res.status(200).json({
          message: "削除が成功しました",
        });
        await deleteImage(result);
      }),
    );
  } catch (err) {
    return next(err);
  }
};

export const findProductsFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await findProductsForUser();
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const getOrCreateCart = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;
  const userId = req.user.id;
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
  const cartId = Number(req.query.cartId);
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
  const product_id = Number(req.params.productId);
  const { cart_id, quantity } = req.body;
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
  if (!req.user) return;
  const user_id = req.user.id;
  const { cart_id, cartProducts } = req.body;
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
  if (!req.user) return;
  const user_id = req.user.id;
  try {
    const data = await orderedProductList(user_id);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const orderListForCompany = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;
  const company_id = req.user.id;
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
  if (!req.user) return;
  const company_id = req.user.id;
  try {
    const data = await getConfirmedOrderList(company_id);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

type DefaultProductWithCustomization = {
  id: number;
  name: string;
  model_number: string;
  price: number;
  description: string;
  image_name?: string;
  imageUrl?: string | null;
  customization: ProductCustomizations[];
};

type ProductCustomizations = {
  id: number;
  user_name: string;
  model_number: string;
  name: string;
  price: number;
  description: string;
  start_date: string;
  end_date: string;
};

type GroupedProduct = Record<number, DefaultProductWithCustomization>;

export const fetchDisplayProductsByCompany = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;
  const company_id = req.user.id;

  try {
    const products = await fetchMergedCompanyProducts(company_id);

    const enrichedProducts = await Promise.all(
      products.map(async (row) => {
        const product: DefaultProductWithCustomization = row.product;
        const customization: ProductCustomizations = row.customization;

        let imageUrl: string | null = null;

        //image_nameがnullの場合、S3へのリクエストがエラーになるため存在チェックを行う
        if (product.image_name) {
          imageUrl = await getSignedImageUrl(product.image_name);
        }
        const productWithUrl = { ...product, imageUrl };
        return { productWithUrl, customization };
      }),
    );

    const groupedProducts = enrichedProducts.reduce<GroupedProduct>((acc, row) => {
      const product = row.productWithUrl;
      const customization = row.customization;

      if (!acc[product.id]) {
        acc[product.id] = {
          id: product.id,
          name: product.name,
          model_number: product.model_number,
          price: product.price,
          description: product.description,
          image_name: product.image_name,
          imageUrl: product.imageUrl,
          customization: [],
        };
      }
      if (customization) {
        acc[product.id].customization.push({
          id: customization.id,
          user_name: customization.user_name,
          model_number: customization.model_number,
          name: customization.name,
          price: customization.price,
          description: customization.description,
          start_date: customization.start_date,
          end_date: customization.end_date,
        });
      }
      return acc;
    }, {});

    const data = Object.values(groupedProducts);

    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const registerCustomProduct = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return;
  const { product_id, user_id, model_number, product_name, price, description, start_date, end_date } = req.body;
  try {
    const data = await addCustomProduct(
      product_id,
      user_id,
      model_number,
      product_name,
      price,
      description,
      start_date,
      end_date,
    );
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const deleteCustomProductsForCompany = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return;

  const { customProductIds } = req.body;

  try {
    const data = await deleteCustomCompanyProducts(customProductIds);
    res.status(200).json({
      message: "削除が成功しました",
      data,
    });
  } catch (err) {
    return next(err);
  }
};

export const deleteCustomProduct = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return;

  const { customProductId } = req.body;

  try {
    const data = await deleteCustomCompanyProduct(customProductId);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const getUserList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getUserIds();
    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
