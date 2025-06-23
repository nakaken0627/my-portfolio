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
      variant="outlined"
      sx={{
        mb: 4,
        boxShadow: 3,
        borderRadius: 2,
        border: "1.5px solid #B0C4DE",
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
