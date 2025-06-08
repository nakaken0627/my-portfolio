"use client";

import { useState } from "react";
import { AppBar, Box, useMediaQuery, useTheme } from "@mui/material";

import { NavDesktop } from "./NavDesktop";
import { NavMobile } from "./NavMobile";

export const TopNav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <AppBar sx={{ backgroundColor: "#f26140" }}>
        {isMobile ? (
          <NavMobile toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
        ) : (
          <NavDesktop />
        )}
      </AppBar>
    </Box>
  );
};
