import { NextFunction, Request, Response } from "express";

import { fetchDisplayProducts } from "../../application/services/product/displayProductService.js";

export const fetchDisplayProductsByCompany = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;

  try {
    const data = await fetchDisplayProducts(req.user.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
