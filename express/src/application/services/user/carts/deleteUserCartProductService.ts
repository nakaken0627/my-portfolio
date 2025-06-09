import { deleteUserCartProduct } from "../../../../infrastructure/repositories/user/cartRepository.js";

export const deleteUserCartProductService = async (cartId: number, productId: number, customizationId: number) => {
  await deleteUserCartProduct(cartId, productId, customizationId);
};
