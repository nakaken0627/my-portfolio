"use client";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { ListItemButton } from "node_modules/@mui/material";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "TOP" },
  { href: "/auth/user-signin", label: "ユーザー様用" },
  { href: "/auth/company-signin", label: "販売企業様" },
];

export const TopNav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => { setDrawerOpen(!drawerOpen); };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#f26140" }}>
        {isMobile ? (
          <Toolbar>
            <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">Top Panel</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {navLinks.map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  component={Link}
                  color="inherit"
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        ) : (
          <Toolbar>
            <Box sx={{ mr: 2 }}>
              <Typography variant="h6">Top Panel</Typography>
            </Box>
            <Box>
              {navLinks.map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  component={Link}
                  color="inherit"
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        )}
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} onClick={toggleDrawer}>
          <List>
            {navLinks.map((link) => (
              <ListItemButton key={link.href} component={Link} href={link.href}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
