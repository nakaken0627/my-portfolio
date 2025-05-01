import { Box, Divider, Typography } from "@mui/material";

import { CompanyLayout } from "../CompanyLayout";
import { GetCompanyInfo } from "./components/GetCompanyInfo";
import { ProductList } from "./components/ProductList";
import { RegisterFunc } from "./components/RegisterFunc";

export default function MyCompanyPage() {
  return (
    <CompanyLayout>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          登録済み画面（販売企業様）
        </Typography>
        <GetCompanyInfo />
        <Divider sx={{ my: 3 }} />
        <ProductList />
        <Divider sx={{ my: 3 }} />
        <RegisterFunc />
      </Box>
    </CompanyLayout>
  );
}
