// import { ReactNode } from "react";
import Link from "next/link";
import { Box, Button, Toolbar, Typography } from "@mui/material";

import { navLinks } from "./NavLinks";
import { SignoutFunc } from "./SignoutFunc";

type Props = {
  userInfo: { name: string } | null;
};

export const NavDesktop = ({ userInfo }: Props) => {
  return (
    <Toolbar>
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
        {/* {userInfo} */}
        <Typography variant="body1" sx={{ mx: 2, borderBottom: "1px solid" }}>
          ようこそ、{userInfo?.name === "test" ? "ゲスト" : userInfo?.name}様
        </Typography>
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
    </Toolbar>
  );
};
