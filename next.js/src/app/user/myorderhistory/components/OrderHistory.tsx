"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/cart-context";

export const OrderHistory = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return;
  const { myUser } = cartContext;

  type Order = {
    order_id: number;
    cart_id: number;
    product_id: number;
    model_number: string;
    product_name: string;
    price: number;
    quantity: number;
    company_name: string;
  };

  type GroupedOrder = {
    [order_id: number]: Order[];
  };

  const [orders, setOrders] = useState<GroupedOrder>({});

  const fetchOrder = async () => {
    if (!myUser) return;
    const res = await fetch("http://localhost:3001/api/user/orderhistory", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: myUser.id,
      }),
    });

    const data: Order[] = await res.json();

    const groupedOrder = data.reduce((acc, item) => {
      if (!acc[item.order_id]) {
        acc[item.order_id] = [];
      }
      acc[item.order_id].push(item);
      return acc;
    }, {} as GroupedOrder);

    setOrders(groupedOrder);
  };

  const orderTotalAmount = (order_id: number, data: Order[]) => {
    const orderData = data.filter((item) => item.order_id === order_id);
    return orderData.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  useEffect(() => {
    fetchOrder();
  }, [myUser]);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">注文履歴</h1>

      {Object.entries(orders).map(([orderId, items]) => (
        <div key={orderId} className="mb-8 rounded-lg border p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">注文ID: {orderId}</h2>
          <h2 className="mb-4 text-xl font-semibold">
            合計金額:¥
            {orderTotalAmount(Number(orderId), items).toLocaleString()}
          </h2>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="border-b p-2">商品番号</th>
                <th className="border-b p-2">商品名</th>
                <th className="border-b p-2">価格</th>
                <th className="border-b p-2">数量</th>
                <th className="border-b p-2">金額</th>
                <th className="border-b p-2">発注先</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.cart_id + "-" + item.model_number}>
                  <td className="border-b p-2">{item.model_number}</td>
                  <td className="border-b p-2">{item.product_name}</td>
                  <td className="border-b p-2">
                    ¥{Math.round(item.price).toLocaleString()}
                  </td>
                  <td className="border-b p-2">{item.quantity}</td>
                  <td className="border-b p-2">
                    ¥{Math.round(item.price * item.quantity).toLocaleString()}
                  </td>
                  <td className="border-b p-2">{item.company_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
