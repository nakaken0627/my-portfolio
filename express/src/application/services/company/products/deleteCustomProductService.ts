import { deleteCustomProduct } from "../../../../infrastructure/repositories/company/productRepository";

export const deleteCustomProductService = async (customProductId: number) => {
  return await deleteCustomProduct(customProductId);
};
