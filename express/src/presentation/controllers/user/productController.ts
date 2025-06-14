import { NextFunction, Request, Response } from "express";

import { fetchPaginatedProductsService } from "../../../application/services/user/products/fetchPaginatedProductsService.js";
import { fetchProductListWithCustomService } from "../../../application/services/user/products/fetchProductListWithCustomService.js";

export const fetchAllProductsWithCustom = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;
  const userId = req.user.id;

  try {
    const data = await fetchProductListWithCustomService(userId);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const fetchPaginatedProducts = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;

  const userId = req.user.id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;

  try {
    const data = await fetchPaginatedProductsService(userId, page, limit);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
