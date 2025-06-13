import Link from "next/link";
import { Box, Button, Toolbar, Typography } from "@mui/material";

import { navLinks } from "./NavLinks";

export const NavDesktop = () => {
  return (
    <Toolbar>
      <Box sx={{ mr: 2 }}>
        <Typography variant="h6">Top Panel</Typography>
      </Box>
      <Box>
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
  );
};
