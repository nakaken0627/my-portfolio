import { deleteUserCartAllProducts } from "../../../../infrastructure/repositories/user/cartRepository";

export const deleteUserCartAllProductsService = async (cartId: number) => {
  await deleteUserCartAllProducts(cartId);
};
