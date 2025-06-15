import { calcProductTotalAmount } from "@/app/user/cart/components/calcProductTotalAmount";
import { CartProduct } from "@/types/cart";

import { mockProducts } from "./mocks/mockProducts";

describe("Test UserCalcProductTotalAmount", () => {
  test("カートの商品単位の小計算出(標準品＆カスタム品)", () => {
    const cartProducts: CartProduct[] = [
      { productId: 1, customizationId: null, quantity: 1 },
      { productId: 1, customizationId: 101, quantity: 2 },
    ];

    const result1 = calcProductTotalAmount(mockProducts, cartProducts, 1, null);
    expect(result1).toBe(100);

    const result2 = calcProductTotalAmount(mockProducts, cartProducts, 1, 101);
    expect(result2).toBe(220);
  });

  test("カートが空の場合の金額計算", () => {
    const cartProducts: CartProduct[] = [];

    const result = calcProductTotalAmount(mockProducts, cartProducts, 1, null);
    expect(result).toBe(0);
  });

  test("商品の数量が空の場合の金額計算", () => {
    const cartProducts: CartProduct[] = [
      { productId: 1, customizationId: null, quantity: 0 },
    ];
    const result = calcProductTotalAmount(mockProducts, cartProducts, 1, null);
    expect(result).toBe(0);
  });
});
