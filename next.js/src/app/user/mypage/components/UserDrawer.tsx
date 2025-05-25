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
    <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
      <Box sx={{ width: 360, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          カスタマイズ品一覧
        </Typography>
        <UserProductCustomizationList customization={customization} />
      </Box>
    </Drawer>
  );
};
