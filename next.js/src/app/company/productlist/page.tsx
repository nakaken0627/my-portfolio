import { Box, Divider } from "@mui/material";

import { CompanyLayout } from "../CompanyLayout";
import { ProductList } from "./components/ProductList";
import { RegisterFunc } from "./components/RegisterFunc";

export default function MyCompanyPage() {
  return (
    <CompanyLayout>
      <Box sx={{ p: 2 }}>
        <ProductList />
        <Divider sx={{ my: 3 }} />
        <RegisterFunc />
      </Box>
    </CompanyLayout>
  );
}
