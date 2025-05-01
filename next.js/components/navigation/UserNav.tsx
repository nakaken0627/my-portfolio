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
import { GetUserInfo } from "components/user/GetUserInfo";
import { SignoutFunc } from "components/user/SignoutFunc";

const navLinks = [
  { href: "/user/mypage", label: "Mypage" },
  { href: "/user/mycart", label: "Mycart" },
  { href: "/user/myorderhistory", label: "Myorderhistory" },
];

export const UserNav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <AppBar sx={{ backgroundColor: "#5cd81d" }}>
        {isMobile ? (
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
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
              <Typography variant="h6" sx={{ mr: 2, cursor: "pointer" }}>
                <Link href="/user/mypage">User Panel</Link>
              </Typography>
              <GetUserInfo />
            </Box>
            <SignoutFunc />
          </Toolbar>
        ) : (
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ mr: 2, cursor: "pointer" }}>
                <Link href="/user/mypage">User Panel</Link>
              </Typography>
              <GetUserInfo />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
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
          </Toolbar>
        )}
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
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
    </>
  );
};
