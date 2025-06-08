import { addCompanyProduct } from "../../../infrastructure/repositories/company/productRepository";
import { AddProductDTO } from "../../../presentation/dto/product.dto";

export const addProductService = async (productData: AddProductDTO) => {
  return await addCompanyProduct(productData);
};
