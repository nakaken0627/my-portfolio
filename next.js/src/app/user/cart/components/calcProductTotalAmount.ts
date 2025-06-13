import { UserProductWithCustom } from "@/types/user";

type CartProduct = {
  productId: number;
  customizationId: number | null;
  quantity: number;
};

export const calcProductTotalAmount = (
  products: UserProductWithCustom[],
  cartProducts: CartProduct[],
  productId: number,
  customizationId: number | null,
) => {
  const product = products.find((item) => item.id === productId);
  if (!product) return 0;

  const cartItem = cartProducts.find(
    (item) =>
      item.productId === productId &&
      (item.customizationId ?? null) === customizationId,
  );
  const quantity = cartItem?.quantity ?? 0; //quantityがundefinedになる可能性を排除する

  if (customizationId === null) {
    return product.price * quantity;
  }

  const customization = product.custom.find(
    (custom) => custom.id === customizationId,
  );
  if (!customization) return 0;
  return customization.price * quantity;
};
