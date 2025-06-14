import { Box, Divider, Typography } from "@mui/material";

import { CompanyLayout } from "../CompanyLayout";
import { ProductList } from "./components/ProductList";
import { RegisterSection } from "./components/RegisterSection";

export default function MyCompanyPage() {
  return (
    <CompanyLayout>
      <Box sx={{ p: { xs: 1, sm: 3 }, maxWidth: "1200px", mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          商品管理
        </Typography>
        <Box sx={{ my: 3 }}>
          <RegisterSection />
        </Box>
        <Divider sx={{ my: 3 }} />
        <ProductList />
      </Box>
    </CompanyLayout>
  );
}
