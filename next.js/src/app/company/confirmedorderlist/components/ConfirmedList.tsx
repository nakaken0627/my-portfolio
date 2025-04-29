"use client";

import { useEffect, useState } from "react";

type Company = {
  id: number;
  name: string;
};

type ConfirmedList = {
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

type groupedList = {
  [order_id: number]: ConfirmedList[];
};

export const ConfirmedList = () => {
  const [myCompany, setMyCompany] = useState<Company | null>(null);
  const [groupingList, setGroupingList] = useState<groupedList>({});

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

  const fetchConfirmedOrderList = async () => {
    if (!myCompany) return;
    try {
      const res = await fetch(
        "http://localhost:3001/api/company/confirmedorder",
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
      const data: ConfirmedList[] = await res.json();
      const groupedList = data.reduce((acc, item) => {
        if (!acc[item.order_id]) {
          acc[item.order_id] = [];
        }
        acc[item.order_id].push(item);
        return acc;
      }, {} as groupedList);
      setGroupingList(groupedList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyCompany();
  }, []);

  useEffect(() => {
    fetchConfirmedOrderList();
  }, [myCompany]);

  return (
    <div>
      {Object.entries(groupingList).map(([order_id, items]) => {
        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        return (
          <div
            key={order_id}
            className="mb-8 rounded-xl border bg-white shadow-sm"
          >
            <div className="flex justify-between border-b p-4">
              <span className="font-semibold">注文ID: {order_id}</span>
              <span className="text-sm text-gray-600">
                顧客: {items[0].user_name}
              </span>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">商品名</th>
                  <th className="px-4 py-2">型番</th>
                  <th className="px-4 py-2">数量</th>
                  <th className="px-4 py-2">単価</th>
                  <th className="px-4 py-2">小計</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2">{item.product_name}</td>
                    <td className="px-4 py-2">{item.model_number}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">
                      ¥{item.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      ¥{(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-semibold">
                  <td colSpan={4} className="px-4 py-2 text-right">
                    合計
                  </td>
                  <td className="px-4 py-2">¥{total.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}
    </div>
  );
};
