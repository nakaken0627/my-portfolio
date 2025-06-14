import { ReactNode } from "react";
import Link from "next/link";
import { Box, Button, Toolbar, Typography } from "@mui/material";

import { navLinks } from "./NavLinks";
import { SignoutFunc } from "./SignoutFunc";

type Props = {
  userInfoElement: ReactNode;
};

export const NavDesktop = ({ userInfoElement }: Props) => {
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
        {userInfoElement}
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
