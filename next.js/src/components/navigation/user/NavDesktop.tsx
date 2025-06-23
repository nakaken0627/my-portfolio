// import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Toolbar, Typography } from "@mui/material";

import { navLinks } from "./NavLinks";
import { SignoutFunc } from "./SignoutFunc";

type Props = {
  userInfo: { name: string } | null;
};

export const NavDesktop = ({ userInfo }: Props) => {
  return (
    <Toolbar sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center", gap: 2 }}>
        <Link href="/user/dashboard" passHref>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Image
              src="/logo.png"
              alt="Smart Deal EC ロゴ"
              width={120}
              height={40}
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
        </Link>

        <Typography
          variant="body1"
          sx={{ color: "#333333", fontWeight: "bold", mr: 2 }}
        >
          ようこそ、{userInfo?.name === "test" ? "ゲスト" : userInfo?.name}様
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        {navLinks.map((link) => (
          <Button
            key={link.href}
            component={Link}
            href={link.href}
            sx={{
              color: "#333",
              textTransform: "none",
              fontWeight: "bold",
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
