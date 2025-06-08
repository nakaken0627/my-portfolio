import { Box } from "@mui/material";

import { UserLayout } from "../UserLayout";
import { OrderHistory } from "./components/OrderHistory";

export default function UserCart() {
  return (
    <UserLayout>
      <Box sx={{ p: 2 }}>
        <OrderHistory />
      </Box>
    </UserLayout>
  );
}
