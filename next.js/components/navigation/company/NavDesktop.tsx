import Link from "next/link";
import { Box, Button, Toolbar, Typography } from "@mui/material";

import { CompanyInfo } from "../../company/CompanyInfo";
import { SignoutFunc } from "../../company/SignoutFunc";
import { navLinks } from "./NavLinks";

export const CompanyNavDesktop = () => {
  return (
    <Toolbar sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center", gap: 2 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          Company Panel
        </Typography>
        <CompanyInfo />
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
    </Toolbar>
  );
};
