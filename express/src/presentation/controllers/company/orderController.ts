import { NextFunction, Request, Response } from "express";

import { fetchOrdersService } from "../../../application/services/company/orders/fetchOrdersService";
import { updateConfirmService } from "../../../application/services/company/orders/updateConfirmService";

export const fetchOrders = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;
  const companyId = req.user.id;
  const { is_confirmed } = req.query;
  const isConfirmedBool = is_confirmed === "true" ? true : false;

  try {
    const data = await fetchOrdersService(isConfirmedBool, companyId);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const updateConfirmOrders = async (req: Request, res: Response, next: NextFunction) => {
  const { confirmedIds } = req.body;
  try {
    const data = await updateConfirmService(confirmedIds);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
