import { OrderProduct, OrderTransformed } from "@/types/company";
import { Box, Card, CardContent, Typography } from "@mui/material";

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
        border: `1.5px solid (2, 2, 2)`,
        // backgroundColor: "#E6F0FA",
        ...(totalAmount >= 50000 && {
          border: "2px solid #FF9999",
          backgroundColor: "#FFF5F5",
        }),
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 2,
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#333333", fontWeight: "bold" }}
          >
            オーダーID: {order.orderId}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#333333",
              // color: "#DF3447",
              fontWeight: "bold",
            }}
          >
            合計金額:
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              // color: "#333333",
              color: "#DF3447",
              fontWeight: "bold",
            }}
          >
            ¥{totalAmount.toLocaleString()}
          </Typography>
        </Box>

        <OrderProductTable
          products={order.products}
          confirmedIds={confirmedIds}
          onCheck={onCheck}
        />
      </CardContent>
    </Card>
  );
};
