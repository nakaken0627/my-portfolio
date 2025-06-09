import {
  checkoutCart,
  createOrder,
  createOrderProduct,
} from "../../../../infrastructure/repositories/user/cartRepository";
import { CartProductWithPriceDTO } from "../../../../presentation/dto/user/cart.dto";

export const checkoutUserCartService = async (
  userId: number,
  cartId: number,
  cartProducts: CartProductWithPriceDTO[],
) => {
  const orderId = await createOrder(userId);
  await checkoutCart(orderId, cartId);
  await createOrderProduct(orderId, cartProducts);

  return orderId;
};
