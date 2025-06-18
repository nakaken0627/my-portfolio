import { deleteCustomProducts } from "../../../../infrastructure/repositories/company/productRepository.js";

export const deleteCustomProductsServices = async (customProductIds: number[]) => {
  return await deleteCustomProducts(customProductIds);
};
