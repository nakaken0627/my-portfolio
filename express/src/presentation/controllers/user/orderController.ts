import { NextFunction, Request, Response } from "express";

import { fetchUserOrdersService } from "../../../application/services/user/orders/fetchUserOrdersService";

export const fetchUserOrders = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;
  const userId = req.user.id;

  try {
    const data = await fetchUserOrdersService(userId);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
