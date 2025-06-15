export type CartProduct = {
  productId: number;
  customizationId: number | null;
  quantity: number;
};

export type CartProductWithPrice = CartProduct & { price: number | null };
