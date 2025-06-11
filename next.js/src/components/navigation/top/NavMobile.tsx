import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { ListItemButton } from "node_modules/@mui/material";

import { navLinks } from "./NavLinks";

type Props = {
  toggleDrawer: () => void;
  drawerOpen: boolean;
};

export const NavMobile = ({ toggleDrawer, drawerOpen }: Props) => {
  return (
    <>
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
