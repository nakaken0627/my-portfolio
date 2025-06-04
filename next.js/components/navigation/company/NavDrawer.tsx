import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
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

import { CompanyInfo } from "../../company/CompanyInfo";
import { SignoutFunc } from "../../company/SignoutFunc";
import { navLinks } from "./NavLinks";

export const CompanyNavDrawer = ({
  toggleDrawer,
}: {
  toggleDrawer: () => void;
}) => {
  return (
    <>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Company Panel</Typography>
          <CompanyInfo />
        </Box>
        <SignoutFunc />
      </Toolbar>

      <Drawer anchor="left" open={true} onClose={toggleDrawer}>
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
