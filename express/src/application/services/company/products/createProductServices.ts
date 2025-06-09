import { createCompanyProduct } from "../../../../infrastructure/repositories/company/productRepository";
import { CreateProductDTO } from "../../../../presentation/dto/company/product.dto";

export const createProductService = async (productData: CreateProductDTO) => {
  return await createCompanyProduct(productData);
};
