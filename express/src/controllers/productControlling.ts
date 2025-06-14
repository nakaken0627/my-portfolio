import { NextFunction, Request, Response } from "express";

import {
  checkoutCart,
  createCart,
  createOrUpdateCartProduct,
  deleteCartAllProducts,
  deleteCartProduct,
  getCart,
  getCartAllProducts,
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
import {
  countAllProducts,
  findAllProductsWithCustomization,
  findProductsWithCustomization,
  orderedProductList,
} from "../models/userModel.js";
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
  if (!req.body || !req.user) return;

  const company_id = String(req.user.id);
  const { model_number, name, price, description } = req.body;

  let imageName: string | null = null;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const imageFile = files?.image?.[0];

  if (imageFile) {
    imageName = await uploadImage(imageFile);
  }

  try {
    const data = await addCompanyProduct(company_id, model_number, name, price, description, imageName ?? "");
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const deleteProductsForCompany = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || !req.user) return;

  const companyId = req.user.id;
  const { productIds } = req.body;

  try {
    await Promise.all(
      productIds.map(async (id: number) => {
        const result = await deleteCompanyProduct(companyId, id);
        res.status(200).json({
          message: "削除が成功しました",
        });
        if (result) {
          await deleteImage(result);
        }
      }),
    );
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
    }
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const getUserCartALLProducts = async (req: Request, res: Response, next: NextFunction) => {
  const cartId = Number(req.query.cartId);
  try {
    const rows = await getCartAllProducts(cartId);
    if (!rows) {
      res.status(404).json({ message: "データが見つかりません" });
      return;
    }
    const data = rows.map((row) => {
      return {
        productId: row.product_id,
        customizationId: row.customization_id,
        quantity: row.quantity,
      };
    });
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const createOrUpdateUserCartProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { cartId, productId, customizationId, quantity } = req.body;
  try {
    const data = await createOrUpdateCartProduct(cartId, quantity, productId, customizationId);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const deleteUserCartProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { cartId, productId, customizationId } = req.body;
  try {
    const data = await deleteCartProduct(cartId, productId, customizationId);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const deleteUserCartALLProducts = async (req: Request, res: Response, next: NextFunction) => {
  const { cartId } = req.body;
  try {
    const data = await deleteCartAllProducts(cartId);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const checkoutUserCart = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;
  const userId = req.user.id;
  const { cartId, cartProducts } = req.body;

  try {
    const order = await createOrder(userId);
    const orderId = order.id;
    await checkoutCart(orderId, cartId);
    await createOrderProduct(orderId, cartProducts);
    res.status(200).json(order);
  } catch (err) {
    return next(err);
  }
};

type OrderProductForUser = {
  id: number;
  name: string;
  company_name: string;
  model_number: string;
  price: number;
  quantity: number;
};

type OrderCustomForUser = {
  id: number;
  model_number: string;
  name: string;
  price: number;
};

type OrderedRowForUser = {
  order_id: number;
  product: OrderProductForUser;
  customization: OrderCustomForUser;
};

type TransformedForUser = {
  orderId: number;
  products: Array<OrderProductForUser & { customization: OrderCustomForUser | null }>;
};

export const orderHistory = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;
  const userId = req.user.id;
  try {
    const rows: OrderedRowForUser[] = await orderedProductList(userId);
    const grouped: Record<number, TransformedForUser["products"]> = {};

    for (const row of rows) {
      const { order_id, product, customization } = row;

      if (!grouped[order_id]) {
        grouped[order_id] = [];
      }

      grouped[order_id].push({
        ...product,
        customization: customization ?? null,
      });
    }
    const data = Object.entries(grouped)
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .map(([orderId, products]) => ({
        orderId: Number(orderId),
        products,
      }));

    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

type OrderProductForCompany = {
  id: number;
  orderProductId: number;
  name: string;
  userName: string;
  model_number: string;
  price: number;
  quantity: number;
  custom: OrderCustomForCompany | null;
};

type OrderCustomForCompany = {
  id: number;
  model_number: string;
  name: string;
  price: number;
};

type OrderedRowForCompany = {
  order_id: number;
  product: OrderProductForCompany;
  customization: OrderCustomForCompany;
};

type TransformedForCompany = {
  orderId: number;
  products: OrderProductForCompany[];
};

export const orderListForCompany = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;
  const companyId = req.user.id;
  const { is_confirmed } = req.query;
  const isConfirmedBool = is_confirmed === "true" ? true : false;
  try {
    const rows: OrderedRowForCompany[] = await getMyOrderList(isConfirmedBool, companyId);
    const grouped: Record<number, TransformedForCompany["products"]> = {};

    for (const row of rows) {
      const { order_id, product, customization } = row;

      if (!grouped[order_id]) {
        grouped[order_id] = [];
      }

      grouped[order_id].push({
        ...product,
        custom: customization ?? null,
      });
    }

    const data = Object.entries(grouped).map(([orderId, products]) => ({
      orderId: Number(orderId),
      products,
    }));

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
  custom: ProductCustomizations[];
};

type ProductCustomizations = {
  id: number;
  user_name?: string;
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
          custom: [],
        };
      }
      if (customization) {
        acc[product.id].custom.push({
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

type UserProductWithCustomization = {
  id: number;
  name: string;
  company_name: string;
  model_number: string;
  price: number;
  description: string;
  image_name?: string;
  imageUrl?: string | null;
  custom: UserProductCustomization[];
};

type UserProductCustomization = {
  id: number;
  model_number: string;
  name: string;
  price: number;
  description: string;
  start_date: string;
  end_date: string;
};

type GroupedUserProduct = Record<number, UserProductWithCustomization>;

export const fetchDisplayProductsForUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;

  const userId = req.user.id;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const offset = (page - 1) * limit;

  try {
    const total: { count: number } = await countAllProducts();
    const products = await findProductsWithCustomization(userId, limit, offset);
    const enrichedProducts = await Promise.all(
      products.map(async (row) => {
        const product: UserProductWithCustomization = row.product;
        const customization: UserProductCustomization = row.customization;

        let imageUrl: string | null = null;

        if (product.image_name) {
          imageUrl = await getSignedImageUrl(product.image_name);
        }
        const productWithUrl = { ...product, imageUrl };
        return { productWithUrl, customization };
      }),
    );

    const groupedProducts = enrichedProducts.reduce<GroupedUserProduct>((acc, row) => {
      const product: UserProductWithCustomization = row.productWithUrl;
      const customization: UserProductCustomization = row.customization;

      if (!acc[product.id]) {
        acc[product.id] = {
          id: product.id,
          name: product.name,
          company_name: product.company_name,
          model_number: product.model_number,
          price: product.price,
          description: product.description,
          image_name: product.image_name,
          imageUrl: product.imageUrl,
          custom: [],
        };
      }
      if (customization) {
        acc[product.id].custom.push({
          id: customization.id,
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
    res.status(200).json({ data, total: total.count });
  } catch (err) {
    next(err);
  }
};

export const fetchAllProductsForUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;
  const userId = req.user.id;
  try {
    const products = await findAllProductsWithCustomization(userId);
    const groupedProducts = products.reduce<GroupedUserProduct>((acc, row) => {
      const product: UserProductWithCustomization = row.product;
      const customization: UserProductCustomization = row.customization;

      if (!product) return acc;

      if (!acc[product.id]) {
        acc[product.id] = {
          id: product.id,
          name: product.name,
          company_name: product.company_name,
          model_number: product.model_number,
          price: product.price,
          description: product.description,
          custom: [],
        };
      }

      if (customization) {
        acc[product.id].custom.push({
          id: customization.id,
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
    next(err);
  }
};

export const getTotalProductsCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await countAllProducts();
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
