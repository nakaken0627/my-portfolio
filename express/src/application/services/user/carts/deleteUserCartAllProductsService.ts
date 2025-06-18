import { deleteUserCartAllProducts } from "../../../../infrastructure/repositories/user/cartRepository.js";

export const deleteUserCartAllProductsService = async (cartId: number) => {
  await deleteUserCartAllProducts(cartId);
};
