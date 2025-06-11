"use client";

// import { ReactNode, useState } from "react";
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
      <AppBar>
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
