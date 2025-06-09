import { deleteCustomProduct } from "../../../../infrastructure/repositories/company/productRepository.js";

export const deleteCustomProductService = async (customProductId: number) => {
  return await deleteCustomProduct(customProductId);
};
