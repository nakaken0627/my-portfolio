import { CartProduct } from "@/types/cart";
import { UserProductWithCustom } from "@/types/user";

export const calcCartTotalAmount = (
  cartProducts: CartProduct[],
  products: UserProductWithCustom[],
) => {
  return cartProducts.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return total;

    const custom =
      item.customizationId !== null
        ? product.custom.find((c) => c.id === item.customizationId)
        : null;

    const targetPrice = custom ? custom.price : product.price;

    return total + targetPrice * item.quantity;
  }, 0);
};
