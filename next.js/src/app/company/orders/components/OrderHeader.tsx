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
        alignItems: "center",
        mb: 2,
        gap: 1,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#333" }}>
        注文ID: {order.orderId}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "#333" }}>
        顧客: {order.products[0].userName}
      </Typography>
    </Box>
  );
};
