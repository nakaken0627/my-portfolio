"use client";

import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "@/context/company-context";

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
  const companyContext = useContext(CompanyContext);
  if (!companyContext) {
    return <div>Loading...</div>;
  }

  const { myCompany } = companyContext;
  const [orderList, setOrderList] = useState<OrderList[]>([]);
  const [groupedOrderList, setGroupedOrderList] = useState<GroupedOrderList>(
    {},
  );
  const [confirmedIds, setConfirmedIds] = useState<number[]>([]);

  const fetchMyOrderList = async () => {
    try {
      const res = await fetch(
        "http://localhost:3001/api/company/getmyorderlist",
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data: OrderList[] = await res.json();
      setOrderList(data);
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
    setConfirmedIds((prev: number[]): number[] => {
      return prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
    });
  };

  const handleClickChangeStatus = async (confirmedIds: number[]) => {
    if (!confirmedIds) return;
    try {
      await fetch("http://localhost:3001/api/company/confirmorder", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          confirmedIds: confirmedIds,
        }),
      });
      setConfirmedIds([]);
      fetchMyOrderList();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePushAllIds = async (orderList: OrderList[]) => {
    if (confirmedIds.length > 0) {
      setConfirmedIds([]);
    } else {
      const idArray = orderList.map((item) => item.id);
      setConfirmedIds(idArray);
    }
  };

  useEffect(() => {
    fetchMyOrderList();
  }, [myCompany]);

  return (
    <div>
      <div>
        <button onClick={() => handleClickChangeStatus(confirmedIds)}>
          受注確定
        </button>
        <button onClick={() => handlePushAllIds(orderList)}>一括選択</button>
      </div>
      {Object.entries(groupedOrderList).map(([order_id, items]) => {
        const totalAmount = orderTotalAmount(Number(order_id), items);
        return (
          <div
            key={order_id}
            className={
              totalAmount >= 50000
                ? "mb-8 rounded-lg border bg-red-500 p-6 shadow"
                : "mb-8 rounded-lg border p-6 shadow"
            }
          >
            <h2 className="mb-4 text-xl font-semibold">
              オーダーID: {order_id}
            </h2>
            <h2 className="mb-4 text-xl font-semibold">
              合計金額:¥
              {totalAmount.toLocaleString()}
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
        );
      })}
    </div>
  );
};
