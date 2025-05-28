import { UserProductCustomization } from "@/types/user";
import { Box, Drawer, Typography } from "@mui/material";

import { UserProductCustomizationList } from "./UserProductCustomizationList";

type DrawerProps = {
  openDrawer: boolean;
  handleDrawerClose: () => void;
  customization: UserProductCustomization[];
};

type Props = {
  drawerProps: DrawerProps;
};

export const UserDrawer = ({ drawerProps }: Props) => {
  const { openDrawer, handleDrawerClose, customization } = drawerProps;
  return (
    <Drawer anchor="bottom" open={openDrawer} onClose={handleDrawerClose}>
      <Box
        sx={{
          width: "100%",
          maxHeight: "80vh",
          p: 2,
          px: 5,
          bgcolor: "f0fdf4",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          カスタマイズ品一覧
        </Typography>
        <UserProductCustomizationList customization={customization} />
      </Box>
    </Drawer>
  );
};
