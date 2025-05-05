import { Box } from "@mui/material";

import { CompanyLayout } from "../CompanyLayout";
import { ConfirmedList } from "./components/ConfirmedList";

export const ConfirmedOrderList = () => {
  return (
    <CompanyLayout>
      <Box sx={{ p: 2 }}>
        <ConfirmedList />
      </Box>
    </CompanyLayout>
  );
};
export default ConfirmedOrderList;
