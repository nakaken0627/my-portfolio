import { ProductCustom } from "../../../domain/models/company/productModel";

export type DisplayProductDto = {
  id: number;
  name: string;
  model_number: string;
  price: number;
  description: string;
  image_name?: string;
  imageUrl?: string | null;
  custom: ProductCustom[];
};

export type CreateProductDTO = {
  companyId: number;
  modelNumber: string;
  productName: string;
  price: number;
  description: string;
  imageName: string;
};

export type CreateCustomProductDTO = {
  productId: number;
  userId: number;
  modelNumber: string;
  productName: string;
  price: number;
  description: string;
  startDate: string;
  endDate: string;
};
