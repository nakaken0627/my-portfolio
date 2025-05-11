import { Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { TopNav } from "components/navigation/TopNav";

export default function Home() {
  return (
    <div>
      <TopNav />
      <Toolbar />
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            m: 2,
            p: 2,
            width: "80%",
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            border: "1px solid grey",
          }}
        >
          <Button
            component={Link}
            href="/auth/user-signin"
            sx={{
              m: 2,
              p: 2,
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
              boxShadow: 1,
              borderRadius: 2,
              border: "1px solid grey",
            }}
          >
            <Typography>ユーザー様</Typography>
          </Button>
        </Box>
        <Box
          sx={{
            m: 2,
            p: 2,
            width: "80%",
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            border: "1px solid grey",
          }}
        >
          <Button
            component={Link}
            href="/auth/company-signin"
            sx={{
              m: 2,
              p: 2,
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
              boxShadow: 1,
              borderRadius: 2,
              border: "1px solid grey",
            }}
          >
            <Typography>販売企業様</Typography>
          </Button>
        </Box>
      </Box>
    </div>
  );
}
