import { createOrUpdateCartProduct } from "../../../../infrastructure/repositories/user/cartRepository.js";

export const createOrUpdateUserCartProductService = async (
  cartId: number,
  productId: number,
  customizationId: number,
  quantity: number,
) => {
  await createOrUpdateCartProduct(cartId, productId, customizationId, quantity);
};
