"use client";

import { ReactNode, useState } from "react";
import { AppBar, Box, useMediaQuery, useTheme } from "@mui/material";

import { NavDesktop } from "./NavDesktop";
import { NavMobile } from "./NavMobile";

type Props = {
  userInfoElement: ReactNode;
};

export const UserNavClient = ({ userInfoElement }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <AppBar sx={{ backgroundColor: "#5cd81d" }}>
        {isMobile ? (
          <NavMobile toggleDrawer={toggleDrawer} userInfoElement drawerOpen />
        ) : (
          <NavDesktop userInfoElement={userInfoElement} />
        )}
      </AppBar>
    </Box>
  );
};
