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
      <AppBar
        sx={{
          bgcolor: "#FCE8E6",
          boxShadow: "none",
          borderBottom: "1px solid #D3D3D3",
        }}
      >
        {isMobile ? (
          <NavMobile toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
        ) : (
          <NavDesktop />
        )}
      </AppBar>
    </Box>
  );
};
