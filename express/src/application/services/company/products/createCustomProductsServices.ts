import { createCustomProduct } from "../../../../infrastructure/repositories/company/productRepository.js";
import { CreateCustomProductDTO } from "../../../../presentation/dto/company/product.dto.js";

export const createCustomProductService = async (productData: CreateCustomProductDTO) => {
  return await createCustomProduct(productData);
};
