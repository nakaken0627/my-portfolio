import { Box } from "@mui/material";

import UserLayout from "../UserLayout";
import { OrderPage } from "./components/OrderPage";

export default function UserCart() {
  return (
    <UserLayout>
      <Box sx={{ p: 2, backgroundColor: "#fafafa", minHeight: "100vh" }}>
        <OrderPage />
      </Box>
    </UserLayout>
  );
}
