"use client";

import { useContext } from "react";
import { CartContext } from "@/context/cart-context";

export const AddedProducts = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    return;
  }
  const {
    cartProducts,
    productList,
    calcProductTotalAmount,
    calcCartTotalAmount,
    addProduct,
    reduceProduct,
    handleQuantityChange,
    deleteProduct,
  } = cartContext;

  return (
    <section className="container mx-auto py-12">
      <h2 className="mb-6 text-3xl font-bold">ショッピングカート</h2>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        {cartProducts.map((cartProduct) => {
          const product = productList.find(
            (item) => item.id === cartProduct.product_id,
          );
          if (!product) {
            return null;
          }
          return (
            <div
              key={cartProduct.product_id}
              className="mb-4 flex items-center justify-between border-b bg-blue-100 pb-4"
            >
              <p className="text-lg">{product.product_name}</p>
              <p className="text-lg">¥{product.price}</p>
              <div className="flex items-center">
                <button
                  className="px-2 text-gray-700"
                  onClick={() => reduceProduct(cartProduct.product_id)}
                >
                  -
                </button>
                <input
                  type="text"
                  value={cartProduct.quantity}
                  onChange={(e) =>
                    handleQuantityChange(product.id, Number(e.target.value))
                  }
                  className="mx-2 w-12 rounded border text-center"
                />
                <button
                  className="px-2 text-gray-700"
                  onClick={() => addProduct(cartProduct.product_id)}
                >
                  +
                </button>
              </div>
              <div className="text-lg">
                ¥{calcProductTotalAmount(cartProduct.product_id)}
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => deleteProduct(cartProduct.product_id)}
              >
                削除
              </button>
            </div>
          );
        })}
        <div className="text-right">
          <p className="text-xl font-semibold">
            合計: ¥{calcCartTotalAmount()}
          </p>
          <a
            href="/checkout"
            className="mt-4 inline-block rounded bg-blue-500 px-6 py-3 text-white transition duration-200 hover:bg-blue-600"
          >
            チェックアウト
          </a>
        </div>
      </div>
    </section>
  );
};
