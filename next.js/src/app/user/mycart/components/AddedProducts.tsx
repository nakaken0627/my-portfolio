"use client";

import { useContext } from "react";
import { CartContext } from "@/context/cart-context";

export const AddedProducts = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <div>Loading...</div>;
  }

  const {
    myUser,
    cartId,
    cartProducts,
    setCartProducts,
    productList,
    calcProductTotalAmount,
    calcCartTotalAmount,
    addProduct,
    reduceProduct,
    handleQuantityChange,
    deleteProduct,
  } = cartContext;

  if (!myUser || !cartId) return null;

  const cartProductsWithPrice = () => {
    if (!cartProducts) return [];
    return cartProducts.map((product) => {
      const findItem = productList.find(
        (item) => item.id === product.product_id,
      );
      const price = findItem?.price;
      return { ...product, price };
    });
  };

  const handleCheckout = async () => {
    const cartProductWithPriceData = cartProductsWithPrice();
    try {
      const data = await fetch("http://localhost:3001/api/cart/checkout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: myUser.id,
          cart_id: cartId.id,
          cartProducts: cartProductWithPriceData,
        }),
      });
      if (!data) return;
      setCartProducts([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="container mx-auto py-12">
      <h2 className="mb-6 text-3xl font-bold">ショッピングカート</h2>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        {cartProducts.length === 0 ? (
          <div>カートが空です</div>
        ) : (
          cartProducts.map((cartProduct) => {
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
                    onClick={async () =>
                      await reduceProduct(cartProduct.product_id)
                    }
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={cartProduct.quantity}
                    onChange={async (e) =>
                      await handleQuantityChange(
                        cartProduct.product_id,
                        Number(e.target.value),
                      )
                    }
                    className="mx-2 w-12 rounded border text-center"
                  />
                  <button
                    className="px-2 text-gray-700"
                    onClick={async () =>
                      await addProduct(cartProduct.product_id)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="text-lg">
                  ¥{calcProductTotalAmount(cartProduct.product_id)}
                </div>
                <button
                  className="text-red-500 hover:underline"
                  onClick={async () => deleteProduct(cartProduct.product_id)}
                >
                  削除
                </button>
              </div>
            );
          })
        )}
        <div className="text-right">
          <p className="text-xl font-semibold">
            合計: ¥{calcCartTotalAmount()}
          </p>

          <button
            className="mt-4 inline-block rounded bg-blue-500 px-6 py-3 text-white transition duration-200 hover:bg-blue-600"
            onClick={handleCheckout}
          >
            チェックアウト
          </button>
        </div>
      </div>
    </section>
  );
};
