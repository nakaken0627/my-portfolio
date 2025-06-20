import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Toolbar } from "@mui/material";

import { navLinks } from "./NavLinks";
import { SignoutFunc } from "./SignoutFunc";

type Props = {
  companyInfo: ReactNode;
};

export const CompanyNavDesktop = ({ companyInfo }: Props) => {
  return (
    <Toolbar sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center", gap: 2 }}>
        <Link href="/company/inbox" passHref>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Image
              src="/logo.jpeg"
              alt="Smart Deal EC ロゴ"
              width={120}
              height={40}
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
        </Link>

        {companyInfo}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {navLinks.map((link) => (
          <Button
            key={link.href}
            component={Link}
            href={link.href}
            sx={{
              color: "#333",
              textTransform: "none",
              fontWeight: "medium",
              "&:hover": {
                color: "#B0C4DE",
                backgroundColor: "transparent",
              },
            }}
          >
            {link.label}
          </Button>
        ))}
        <SignoutFunc />
      </Box>
    </Toolbar>
  );
};
