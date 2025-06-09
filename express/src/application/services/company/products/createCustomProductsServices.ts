import { createCustomProduct } from "../../../../infrastructure/repositories/company/productRepository";
import { CreateCustomProductDTO } from "../../../../presentation/dto/company/product.dto";

export const createCustomProductService = async (productData: CreateCustomProductDTO) => {
  return await createCustomProduct(productData);
};
