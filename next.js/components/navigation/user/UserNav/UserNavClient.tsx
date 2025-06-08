"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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

import { SignoutFunc } from "../../../user/SignoutFunc";

type Props = {
  userInfoElement: ReactNode;
};

const navLinks = [
  { href: "/user/dashboard", label: "マイページ" },
  { href: "/user/cart", label: "カート" },
  { href: "/user/orders", label: "注文履歴" },
];

export const UserNavClient = ({ userInfoElement }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#5cd81d" }}>
        <Toolbar>
          {isMobile ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                  <Link href="/user/mypage">User Panel</Link>
                </Typography>
                {userInfoElement}
              </Box>
              <IconButton color="inherit" href="/user/cart">
                <ShoppingCartIcon />
              </IconButton>
              <SignoutFunc />
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="h6">
                  <Link href="/user/mypage">User Panel</Link>
                </Typography>
                {userInfoElement}
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
            </>
          )}
        </Toolbar>
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
