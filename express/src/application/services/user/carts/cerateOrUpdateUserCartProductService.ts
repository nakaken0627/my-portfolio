import { createOrUpdateCartProduct } from "../../../../infrastructure/repositories/user/cartRepository";

export const createOrUpdateUserCartProductService = async (
  cartId: number,
  productId: number,
  customizationId: number,
  quantity: number,
) => {
  await createOrUpdateCartProduct(cartId, productId, customizationId, quantity);
};
