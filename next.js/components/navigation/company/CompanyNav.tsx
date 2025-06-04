"use client";

import { useState } from "react";
import { AppBar, Box, useMediaQuery, useTheme } from "@mui/material";

import { CompanyNavDesktop } from "./NavDesktop";
import { CompanyNavDrawer } from "./NavDrawer";

export const CompanyNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <AppBar>
        {isMobile ? (
          <CompanyNavDrawer toggleDrawer={toggleDrawer} />
        ) : (
          <CompanyNavDesktop />
        )}
      </AppBar>
    </Box>
  );
};
