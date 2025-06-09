import { NextFunction, Request, Response } from "express";

import { fetchOrCreateUserCartService } from "../../../application/services/user/fetchOrCreateUserCartService";

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
