import { deleteCustomProducts } from "../../../../infrastructure/repositories/company/productRepository";

export const deleteCustomProductsServices = async (customProductIds: number[]) => {
  return await deleteCustomProducts(customProductIds);
};
