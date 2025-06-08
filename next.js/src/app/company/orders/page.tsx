import { Box } from "@mui/material";

import { CompanyLayout } from "../CompanyLayout";
import { ConfirmedList } from "./components/ConfirmedList";

export default function ConfirmedOrderList() {
  return (
    <CompanyLayout>
      <Box sx={{ p: 2 }}>
        <ConfirmedList />
      </Box>
    </CompanyLayout>
  );
}
