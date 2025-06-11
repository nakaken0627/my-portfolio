import { NextFunction, Request, Response } from "express";

import { createCustomProductService } from "../../../application/services/company/products/createCustomProductsServices.js";
import { createProductService } from "../../../application/services/company/products/createProductServices.js";
import { deleteCustomProductService } from "../../../application/services/company/products/deleteCustomProductService.js";
import { deleteCustomProductsServices } from "../../../application/services/company/products/deleteCustomProductsServices.js";
import { deleteProductsServices } from "../../../application/services/company/products/deleteProductsServices.js";
import { fetchDisplayProductsService } from "../../../application/services/company/products/fetchDisplayProductsService.js";
import { getUserIds } from "../../../infrastructure/repositories/company/companyRepository.js";
import { uploadImage } from "../../../infrastructure/s3/s3Service.js";
import { CreateCustomProductDTO, CreateProductDTO } from "../../dto/company/product.dto.js";

export const fetchDisplayProducts = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;

  try {
    const data = await fetchDisplayProductsService(req.user.id);
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

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.body || !req.user) return;

  const companyId = req.user.id;
  const { modelNumber, name, price, description } = req.body;

  let imageName: string | null = null;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const imageFile = files?.image?.[0];

  if (imageFile) {
    imageName = await uploadImage(imageFile);
  }

  const productData: CreateProductDTO = {
    companyId,
    modelNumber,
    name,
    price: Number(price),
    description,
    imageName: imageName ?? "",
  };

  try {
    const data = await createProductService(productData);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const createCustomProduct = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return;
  const { productId, userId, modelNumber, productName, price, description, startDate, endDate } = req.body;

  const productData: CreateCustomProductDTO = {
    productId,
    userId,
    modelNumber,
    productName,
    price,
    description,
    startDate,
    endDate,
  };

  try {
    const data = await createCustomProductService(productData);
    res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const deleteProducts = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || !req.user) return;

  const companyId = req.user.id;
  const productIds: number[] = req.body.productIds;

  try {
    const result = await deleteProductsServices(companyId, productIds);
    res.status(200).json({
      message: "削除が成功しました",
      result,
    });
  } catch (err) {
    return next(err);
  }
};

export const deleteCustomProducts = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return;

  const { customProductIds } = req.body;

  try {
    const result = await deleteCustomProductsServices(customProductIds);
    res.status(200).json({
      message: "削除が成功しました",
      result,
    });
  } catch (err) {
    return next(err);
  }
};

export const deleteCustomProduct = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return;

  try {
    const result = await deleteCustomProductService(req.body.customProductId);
    res.status(200).json({
      message: "削除が成功しました",
      result,
    });
  } catch (err) {
    return next(err);
  }
};
