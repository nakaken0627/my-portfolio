"use client";

import { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GetCompanyInfo } from "components/user/GetCompanyInfo";

import { SignoutFunc } from "../user/LogoutFunc";

export const CompanyNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinks = [
    { href: "/company/mypage", label: "Mypage" },
    { href: "/company/orderlist", label: "Order List" },
    { href: "/company/confirmedorderlist", label: "Confirmed Orders" },
  ];

  return (
    <nav>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          {isMobile ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                overflow: "hidden",
                justifyContent: "space-between",
                width: "100%",
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  minWidth: 0,
                  alignItems: "center",
                  flexGrow: 1,
                  gap: 2,
                }}
              >
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={toggleDrawer}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>

                <Typography variant="h6">Company Panel</Typography>
                <GetCompanyInfo />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "64px",
                  gap: 2,
                }}
              >
                <SignoutFunc />
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Company Panel
                </Typography>
                <GetCompanyInfo />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    component={Link}
                    href={link.href}
                    color="inherit"
                  >
                    {link.label}
                  </Button>
                ))}

                <SignoutFunc />
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} onClick={toggleDrawer}>
          <List>
            {navLinks.map((link) => (
              <ListItemButton key={link.href} component={Link} href={link.href}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
            <ListItem>
              <SignoutFunc />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </nav>
  );
};
