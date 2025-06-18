export type UserCartProductDTO = {
  productId: number;
  customizationId: number | null;
  quantity: number;
};

export type CartProductWithPriceDTO = UserCartProductDTO & { price: number };
