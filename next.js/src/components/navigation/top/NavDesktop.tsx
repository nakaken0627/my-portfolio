import Image from "next/image";
import Link from "next/link";
import { Box, Button, Toolbar } from "@mui/material";

import { navLinks } from "./NavLinks";

export const NavDesktop = () => {
  return (
    <Toolbar>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link href="/" passHref>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Image
              src="/logo.png"
              alt="Smart Deal EC ロゴ"
              width={120}
              height={40}
              priority
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
        </Link>
      </Box>
      <Box>
        {navLinks.map((item) => (
          <Button
            key={item.href}
            href={item.href}
            component={Link}
            color="inherit"
            sx={{ color: "#4A4A4A", fontWeight: "bold" }}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </Toolbar>
  );
};
