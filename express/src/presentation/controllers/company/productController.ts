import { NextFunction, Request, Response } from "express";

import { fetchDisplayProducts } from "../../../application/services/company/displayProductService.js";
import { getUserIds } from "../../../infrastructure/repositories/company/companyRepository.js";
import { uploadImage } from "../../../infrastructure/s3/s3Service.js";
import { AddProductDTO } from "../../../presentation/dto/product.dto";

// import { getUserIds } from ".models/companyModel.js";

export const fetchDisplayProductsByCompany = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;

  try {
    const data = await fetchDisplayProducts(req.user.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
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

export const addProductForCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.body || !req.user) return;

  const companyId = String(req.user.id);
  const { modelNumber, productName, price, description } = req.body;

  let imageName: string | null = null;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const imageFile = files?.image?.[0];

  if (imageFile) {
    imageName = await uploadImage(imageFile);
  }

  const productData: AddProductDTO = {
    modelNumber,
    productName,
    price: Number(price),
    description,
    imageName: imageName ?? "",
  };

  try {
    const data = await addCompanyProduct(companyId, modelNumber, productName, price, description, imageName ?? "");
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
