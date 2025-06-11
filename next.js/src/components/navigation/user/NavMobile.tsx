// import { ReactNode } from "react";
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

// type Props = {
//   userInfo: ReactNode;
//   toggleDrawer: () => void;
//   drawerOpen: boolean;
// };

type Props = {
  userInfo: { name: string } | null;
  toggleDrawer: () => void;
  drawerOpen: boolean;
};

export const NavMobile = ({ userInfo, toggleDrawer, drawerOpen }: Props) => {
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
          {/* {userInfo} */}
          <Typography variant="body1" sx={{ mx: 2, borderBottom: "1px solid" }}>
            ようこそ、{userInfo?.name === "test" ? "ゲスト" : userInfo?.name}様
          </Typography>
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
