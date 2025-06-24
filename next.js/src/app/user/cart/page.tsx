import { Box } from "@mui/material";

import UserLayout from "../UserLayout";
import { CurrentCart } from "./components/CurrentCart";

export default function UserCart() {
  return (
    <UserLayout>
      <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh", p: 2 }}>
        <CurrentCart />
      </Box>
    </UserLayout>
  );
}
