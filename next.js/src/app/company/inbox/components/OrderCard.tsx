import { OrderProduct, OrderTransformed } from "@/types/company";
import { Card, CardContent, Typography } from "@mui/material";

import { OrderProductTable } from "./OrderProductTable";

type Props = {
  order: OrderTransformed;
  confirmedIds: number[];
  onCheck: (id: number) => void;
};

export const OrderCard = ({ order, confirmedIds, onCheck }: Props) => {
  const orderTotalAmount = (data: OrderProduct[]) => {
    return data.reduce((total, p) => {
      const custom = p.custom;
      return custom
        ? total + custom.price * p.quantity
        : total + p.price * p.quantity;
    }, 0);
  };

  const totalAmount = orderTotalAmount(order.products);

  return (
    <Card
      key={order.orderId}
      sx={{
        mb: 4,
        border: totalAmount >= 50000 ? "2px solid red" : "1px solid #ccc",
        backgroundColor: totalAmount >= 50000 ? "#fff5f5" : "white",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          オーダーID: {order.orderId}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          合計金額: ¥{totalAmount.toLocaleString()}
        </Typography>
        <OrderProductTable
          products={order.products}
          confirmedIds={confirmedIds}
          onCheck={onCheck}
        />
      </CardContent>
    </Card>
  );
};
