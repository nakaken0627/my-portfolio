import { Box } from "@mui/material";

import { CompanyLayout } from "../CompanyLayout";
import { DisplayOrderList } from "./components/DisplayOrderList";

export default function OrderList() {
  return (
    <CompanyLayout>
      <Box sx={{ p: 2 }}>
        <DisplayOrderList />
      </Box>
    </CompanyLayout>
  );
}
