import { createCompanyProduct } from "../../../../infrastructure/repositories/company/productRepository.js";
import { CreateProductDTO } from "../../../../presentation/dto/company/product.dto.js";

export const createProductService = async (productData: CreateProductDTO) => {
  return await createCompanyProduct(productData);
};
