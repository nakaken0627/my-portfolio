import { calcCartTotalAmount } from "@/app/user/cart/components/calcCartTotalAmount";
import { CartProduct } from "@/types/cart";

import { mockProducts } from "./mocks/mockProducts";

describe("Test UserCalcCartTotalAmount.test", () => {
  test("カートの合計金額の計算", () => {
    const cartProducts: CartProduct[] = [
      { productId: 1, customizationId: null, quantity: 1 },
      { productId: 1, customizationId: 101, quantity: 2 },
      { productId: 2, customizationId: null, quantity: 3 },
    ];
    const result = calcCartTotalAmount(cartProducts, mockProducts);
    expect(result).toBe(920);
  });

  test("カートが空の場合の金額計算", () => {
    const cartProducts: CartProduct[] = [];
    const result = calcCartTotalAmount(cartProducts, mockProducts);
    expect(result).toBe(0);
  });
});
