import { ReactNode } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { navLinks } from "./NavLinks";
import { SignoutFunc } from "./SignoutFunc";

type Props = {
  userInfoElement: ReactNode;
  toggleDrawer: () => void;
  drawerOpen: boolean;
};

export const NavMobile = ({
  userInfoElement,
  toggleDrawer,
  drawerOpen,
}: Props) => {
  return (
    <>
      <Toolbar>
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
      </Toolbar>

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
