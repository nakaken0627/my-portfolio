import { ProductCustomization } from "../../domain/models/productModel";

export type DisplayProductDto = {
  id: number;
  name: string;
  model_number: string;
  price: number;
  description: string;
  image_name?: string;
  imageUrl?: string | null;
  customization: ProductCustomization[];
};
