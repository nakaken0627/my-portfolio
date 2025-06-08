import { OrderTransformed } from "@/types/company";
import { Box, Typography } from "@mui/material";

type Props = {
  order: OrderTransformed;
};

export const OrderHeader = ({ order }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        mb: 2,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        注文ID: {order.orderId}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        顧客: {order.products[0].userName}
      </Typography>
    </Box>
  );
};
