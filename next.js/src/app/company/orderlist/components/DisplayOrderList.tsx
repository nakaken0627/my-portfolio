"use client";

import { useEffect, useState } from "react";

type Company = {
  id: number;
  name: string;
};

type OrderList = {
  id: number;
  company_id: number;
  order_id: number;
  user_name: string;
  model_number: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
};

type GroupedOrderList = {
  [order_id: number]: OrderList[];
};

export const DisplayOrderList = () => {
  const [myCompany, setMyCompany] = useState<Company | null>(null);
  const [groupedOrderList, setGroupedOrderList] = useState<GroupedOrderList>(
    {},
  );
  const [confirmedIds, setConfirmedIds] = useState<number[]>([]);

  const fetchMyCompany = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/company/mycompany", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("[MyCompanyPage]レスポンスエラー(company)");
      }
      const data = await res.json();
      if (!data) return;
      setMyCompany(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyOrderList = async () => {
    if (!myCompany) return;
    try {
      const res = await fetch(
        "http://localhost:3001/api/company/getmyorderlist",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company_id: myCompany.id,
          }),
        },
      );
      const data: OrderList[] = await res.json();
      const groupedOrders = data.reduce((acc, item) => {
        if (!acc[item.order_id]) {
          acc[item.order_id] = [];
        }
        acc[item.order_id].push(item);
        return acc;
      }, {} as GroupedOrderList);
      setGroupedOrderList(groupedOrders);
    } catch (err) {
      console.error(err);
    }
  };

  const orderTotalAmount = (order_id: number, items: OrderList[]) => {
    const orderData = items.filter((item) => item.order_id === order_id);
    return orderData.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const handleCheckBoxStatus = (id: number) => {
    console.log(confirmedIds);
    setConfirmedIds((prev: number[]): number[] => {
      return prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
    });
  };

  useEffect(() => {
    console.log(confirmedIds);
    fetchMyCompany();
  }, []);

  useEffect(() => {
    fetchMyOrderList();
  }, [myCompany]);

  return (
    <div>
      <div>
        <button>受注確定</button>
      </div>
      {Object.entries(groupedOrderList).map(([order_id, items]) => (
        <div key={order_id} className="mb-8 rounded-lg border p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">オーダーID: {order_id}</h2>
          <h2 className="mb-4 text-xl font-semibold">
            合計金額:¥
            {orderTotalAmount(Number(order_id), items).toLocaleString()}
          </h2>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="border-b p-2"></th>
                <th className="border-b p-2">商品番号</th>
                <th className="border-b p-2">商品名</th>
                <th className="border-b p-2">価格</th>
                <th className="border-b p-2">数量</th>
                <th className="border-b p-2">金額</th>
                <th className="border-b p-2">発注者</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.order_id + "-" + item.product_id}>
                  <td className="border-b p-2">
                    <input
                      type="checkbox"
                      checked={confirmedIds.includes(item.id)}
                      onChange={() => handleCheckBoxStatus(item.id)}
                    />
                  </td>
                  <td className="border-b p-2">{item.model_number}</td>
                  <td className="border-b p-2">{item.product_name}</td>
                  <td className="border-b p-2">
                    ¥{Math.round(item.price).toLocaleString()}
                  </td>
                  <td className="border-b p-2">{item.quantity}</td>
                  <td className="border-b p-2">
                    ¥{Math.round(item.price * item.quantity).toLocaleString()}
                  </td>
                  <td className="border-b p-2">{item.user_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
