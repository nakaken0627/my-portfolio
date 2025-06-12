import { OrderedUserRow } from "../../../../domain/models/user/orderModel.js";
import { getUserOrders } from "../../../../infrastructure/repositories/user/orderRepository.js";
import { TransformedUserOrderDTO } from "../../../../presentation/dto/user/order.dto.js";

export const fetchUserOrdersService = async (userId: number) => {
  const rows: OrderedUserRow[] = await getUserOrders(userId);
  const grouped: Record<number, TransformedUserOrderDTO["products"]> = {};

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
      name: product.name,
      companyName: product.company_name,
      modelNumber: product.model_number,
      price: product.price,
      quantity: product.quantity,
      custom: customData,
    });
  }

  return Object.entries(grouped)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([orderId, products]) => ({
      orderId: Number(orderId),
      products,
    }));
};
