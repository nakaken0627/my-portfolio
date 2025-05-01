import { Box } from "@mui/material";

import { UserLayout } from "../UserLayout";
import ProductsList from "./components/ProductsList";

export default function MyUserPage() {
  return (
    <UserLayout>
      <Box sx={{ p: 2 }}>
        <ProductsList />
      </Box>
    </UserLayout>
  );
}
