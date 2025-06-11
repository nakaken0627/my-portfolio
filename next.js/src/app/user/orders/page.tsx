import { Box } from "@mui/material";

import UserLayout from "../UserLayout";
// import { UserLayout } from "../layout";
import { OrderPage } from "./components/OrderPage";

export default function UserCart() {
  return (
    <UserLayout>
      <Box sx={{ p: 2 }}>
        <OrderPage />
      </Box>
    </UserLayout>
  );
}
