import { ReactNode } from "react";
import Image from "next/image";
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
  useMediaQuery,
} from "@mui/material";

import { navLinks } from "./NavLinks";
import { SignoutFunc } from "./SignoutFunc";

type Props = {
  companyInfo: ReactNode;
  drawerOpen: boolean;
  toggleDrawer: () => void;
};

export const CompanyNavMobile = ({
  toggleDrawer,
  companyInfo,
  drawerOpen,
}: Props) => {
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  return (
    <>
      <Toolbar
        sx={{
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: isSmallScreen ? "stretch" : "center",
          justifyContent: isSmallScreen ? "flex-start" : "space-between",
          px: 2,
          py: 1,
          gap: isSmallScreen ? 1 : 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Link href="/company/inbox" passHref>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Smart Deal EC ロゴ"
                  width={120}
                  height={40}
                  priority
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Link>
            {!isSmallScreen && <Box>{companyInfo}</Box>}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SignoutFunc />
          </Box>
        </Box>

        {isSmallScreen && (
          <Box
            sx={{
              mt: 1,
              mx: "auto",
              px: 2,
              maxWidth: "100%",
              textAlign: "center",
              fontSize: "0.9rem",
              wordBreak: "break-word",
            }}
          >
            {companyInfo}
          </Box>
        )}
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "#F5F5F5",
            height: "100%",
            color: "#333",
          }}
          onClick={toggleDrawer}
        >
          <List>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  "&:hover": {
                    backgroundColor: "#E6F0FA",
                  },
                }}
              >
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
