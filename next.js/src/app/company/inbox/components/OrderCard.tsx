import { OrderProduct, OrderTransformed } from "@/types/company";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
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
        border: `0.5px solid rgb(219, 219, 219)`,
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
              fontWeight: "bold",
            }}
          >
            合計金額:
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#DF3447",
              fontWeight: "bold",
            }}
          >
            ¥{totalAmount.toLocaleString()}
          </Typography>

          {totalAmount >= 50000 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 2,
              }}
            >
              <WarningAmberIcon sx={{ color: "#DF3447" }} />
              <Typography variant="body2" sx={{ color: "#DF3447" }}>
                合計金額が5万円以上です
              </Typography>
            </Box>
          )}
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
