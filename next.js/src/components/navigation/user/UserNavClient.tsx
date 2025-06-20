"use client";

import { useState } from "react";
import { AppBar, Box, useMediaQuery, useTheme } from "@mui/material";

import { NavDesktop } from "./NavDesktop";
import { NavMobile } from "./NavMobile";

type Props = {
  userInfo: { name: string } | null;
};

export const UserNavClient = ({ userInfo }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <AppBar
        position="static"
        elevation={1}
        sx={{
          backgroundColor: "#E6F4EA",
          color: "#333333",
          borderBottom: "1px solid #DDDDDD",
        }}
      >
        {isMobile ? (
          <NavMobile
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
            userInfo={userInfo}
          />
        ) : (
          <NavDesktop userInfo={userInfo} />
        )}
      </AppBar>
    </Box>
  );
};
