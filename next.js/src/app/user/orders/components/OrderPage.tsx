import { fetchOrderServer } from "@/app/user/orders/components/fetchOrderServer";

import { OrderDisplay } from "./OrderDisplay";

export const OrderPage = async () => {
  const orders = await fetchOrderServer();
  if (!orders) return null;

  return <OrderDisplay orders={orders} />;
};
