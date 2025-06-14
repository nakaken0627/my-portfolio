import { Box } from "@mui/material";

import UserLayout from "../UserLayout";
import { CurrentCart } from "./components/CurrentCart";

export default function UserCart() {
  return (
    <UserLayout>
      <Box sx={{ p: 2 }}>
        <CurrentCart />
      </Box>
    </UserLayout>
  );
}
