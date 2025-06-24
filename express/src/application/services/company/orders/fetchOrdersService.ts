import { OrderRow } from "../../../../domain/models/company/orderModel.js";
import { getOrders } from "../../../../infrastructure/repositories/company/orderRepositories.js";
import { TransformedOrders } from "../../../../presentation/dto/company/order.dto.js";

export const fetchOrdersService = async (isConfirmedBool: boolean, companyId: number): Promise<TransformedOrders[]> => {
  const rows: OrderRow[] = await getOrders(isConfirmedBool, companyId);
  const grouped: Record<number, TransformedOrders["products"]> = {};

  for (const row of rows) {
    const { order_id, product, custom } = row;

    if (!grouped[order_id]) {
      grouped[order_id] = [];
    }

    const customData = custom
      ? {
          id: custom.id,
          modelNumber: custom.model_number,
          name: custom.name,
          price: custom.price,
        }
      : null;

    grouped[order_id].push({
      id: product.id,
      orderProductId: product.orderProductId,
      name: product.name,
      userName: product.userName,
      modelNumber: product.model_number,
      price: product.price,
      quantity: product.quantity,
      custom: customData,
    });
  }

  return Object.entries(grouped).map(([orderId, products]) => ({
    orderId: Number(orderId),
    products,
  }));
};
