import Image from "next/image";
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
  useMediaQuery,
} from "@mui/material";

import { navLinks } from "./NavLinks";
import { SignoutFunc } from "./SignoutFunc";

type Props = {
  userInfo: { name: string } | null;
  toggleDrawer: () => void;
  drawerOpen: boolean;
};

export const NavMobile = ({ userInfo, toggleDrawer, drawerOpen }: Props) => {
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  return (
    <>
      <Toolbar
        sx={{
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          gap: isSmallScreen ? 1 : 0,
          backgroundColor: "#E6F4EA",
          borderBottom: "1px solid #DDDDDD",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon sx={{ color: "#333" }} />
          </IconButton>
          <Link href="/user/dashboard" passHref>
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <Image
                src="/logo.jpeg"
                alt="Smart Deal EC ロゴ"
                width={120}
                height={40}
                style={{ objectFit: "contain" }}
              />
            </Box>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {!isSmallScreen && (
            <Box>
              <Typography
                variant="body1"
                sx={{ color: "#333333", fontWeight: "bold", mr: 2 }}
              >
                ようこそ、
                {userInfo?.name === "test" ? "ゲスト" : userInfo?.name}様
              </Typography>
            </Box>
          )}

          <IconButton color="inherit" href="/user/cart">
            <ShoppingCartIcon />
          </IconButton>

          <SignoutFunc />
        </Box>
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
