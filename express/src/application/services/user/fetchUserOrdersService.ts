import { OrderedUserRow } from "../../../domain/models/user/orderModel";
import { getUserOrders } from "../../../infrastructure/repositories/user/orderRepository";
import { TransformedUserOrderDTO } from "../../../presentation/dto/user/order.dto";

export const fetchUserOrdersService = async (userId: number) => {
  const rows: OrderedUserRow[] = await getUserOrders(userId);
  const grouped: Record<number, TransformedUserOrderDTO["products"]> = {};

  for (const row of rows) {
    const { order_id, product, customization } = row;

    if (!grouped[order_id]) {
      grouped[order_id] = [];
    }

    grouped[order_id].push({
      ...product,
      customization: customization ?? null,
    });
  }

  return Object.entries(grouped)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([orderId, products]) => ({
      orderId: Number(orderId),
      products,
    }));
};
