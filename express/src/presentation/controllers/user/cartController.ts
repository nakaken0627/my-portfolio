import { NextFunction, Request, Response } from "express";

import { createOrUpdateUserCartProductService } from "../../../application/services/user/carts/cerateOrUpdateUserCartProductService.js";
import { checkoutUserCartService } from "../../../application/services/user/carts/checkoutUserCartService.js";
import { deleteUserCartAllProductsService } from "../../../application/services/user/carts/deleteUserCartAllProductsService.js";
import { deleteUserCartProductService } from "../../../application/services/user/carts/deleteUserCartProductService.js";
import { fetchOrCreateUserCartService } from "../../../application/services/user/carts/fetchOrCreateUserCartService.js";
import { fetchUserOrderProductsService } from "../../../application/services/user/orders/fetchUserOrderProductsService.js";

export const getOrCreateCart = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;
  const userId = req.user.id;

  try {
    const data = await fetchOrCreateUserCartService(userId);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const fetchUserCartProducts = async (req: Request, res: Response, next: NextFunction) => {
  const cartId = Number(req.query.cartId);

  try {
    const data = await fetchUserOrderProductsService(cartId);
    console.log("data", data);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const createOrUpdateUserCartProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { cartId, productId, customizationId, quantity } = req.body;
  try {
    const data = await createOrUpdateUserCartProductService(cartId, quantity, productId, customizationId);
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
    const data = await checkoutUserCartService(userId, cartId, cartProducts);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const deleteUserCartProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { cartId, productId, customizationId } = req.body;
  try {
    const data = await deleteUserCartProductService(cartId, productId, customizationId);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const deleteUserCartALLProducts = async (req: Request, res: Response, next: NextFunction) => {
  const { cartId } = req.body;
  try {
    const data = await deleteUserCartAllProductsService(cartId);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
