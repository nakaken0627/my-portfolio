import { OrderTransformed } from "@/types/company";
import { Card, CardContent } from "@mui/material";

import { OrderHeader } from "./OrderHeader";
import { OrderTable } from "./OrderTable";

type Props = {
  order: OrderTransformed;
};

export const OrderCard = ({ order }: Props) => {
  const total = order.products.reduce(
    (sum, p) =>
      p.custom ? sum + p.custom.price * p.quantity : sum + p.price * p.quantity,
    0,
  );
  return (
    <Card
      key={order.orderId}
      variant="outlined"
      sx={{
        mb: 4,
        boxShadow: 3,
        borderRadius: 2,
        overflowX: "auto",
      }}
    >
      <CardContent>
        <OrderHeader order={order} />

        <OrderTable products={order.products} total={total} />
      </CardContent>
    </Card>
  );
};
