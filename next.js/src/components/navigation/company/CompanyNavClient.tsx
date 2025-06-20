"use client";

import { ReactNode, useState } from "react";
import { AppBar, Box, useMediaQuery, useTheme } from "@mui/material";

import { CompanyNavDesktop } from "./NavDesktop";
import { CompanyNavMobile } from "./NavMobile";

type Props = {
  companyInfo: ReactNode;
};

export const CompanyNavClient = ({ companyInfo }: Props) => {
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
          backgroundColor: "#E6F0FA",
          color: "#333333",
          borderBottom: "1px solid #DDDDDD",
        }}
      >
        {isMobile ? (
          <CompanyNavMobile
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
            companyInfo={companyInfo}
          />
        ) : (
          <CompanyNavDesktop companyInfo={companyInfo} />
        )}
      </AppBar>
    </Box>
  );
};
