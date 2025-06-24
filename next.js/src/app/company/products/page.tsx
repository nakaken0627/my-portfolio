import { Box, Divider } from "@mui/material";

import { CompanyLayout } from "../CompanyLayout";
import { ProductList } from "./components/ProductList";
import { RegisterSection } from "./components/RegisterSection";

export default function MyCompanyPage() {
  return (
    <CompanyLayout>
      <Box sx={{ p: { xs: 1, sm: 3 }, maxWidth: "1200px", mx: "auto" }}>
        <Box>
          <RegisterSection />
        </Box>

        <Divider sx={{ my: 2 }} />

        <ProductList />
      </Box>
    </CompanyLayout>
  );
}
