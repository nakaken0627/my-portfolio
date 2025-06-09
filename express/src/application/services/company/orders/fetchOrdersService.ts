import { OrderRow } from "../../../../domain/models/company/orderModel";
import { getOrders } from "../../../../infrastructure/repositories/company/orderRepositories";
import { TransformedOrders } from "../../../../presentation/dto/company/order.dto";

export const fetchOrdersService = async (isConfirmedBool: boolean, companyId: number): Promise<TransformedOrders[]> => {
  const rows: OrderRow[] = await getOrders(isConfirmedBool, companyId);
  const grouped: Record<number, TransformedOrders["products"]> = {};

  for (const row of rows) {
    const { order_id, product, custom } = row;

    if (!grouped[order_id]) {
      grouped[order_id] = [];
    }

    grouped[order_id].push({
      ...product,
      custom: custom ?? null,
    });
  }

  return Object.entries(grouped).map(([orderId, products]) => ({
    orderId: Number(orderId),
    products,
  }));
};
