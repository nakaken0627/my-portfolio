import { Box } from "@mui/material";

import UserLayout from "../UserLayout";
import { UserProductList } from "./components/UserProductList";

export default function MyUserPage() {
  return (
    <UserLayout>
      <Box sx={{ p: 2 }}>
        <UserProductList />
      </Box>
    </UserLayout>
  );
}
