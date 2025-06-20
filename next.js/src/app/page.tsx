import Image from "next/image";
import Link from "next/link";
import { TopNav } from "@/components/navigation/top/TopNav";
import { Box, Button, Toolbar, Typography } from "@mui/material";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      <TopNav />
      <Toolbar />

      {/* ロゴ表示 */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "700px", // 最大幅を制限（例：600px）
          mx: "auto", // 中央寄せ
          px: { xs: 2, sm: 4 },
          py: 2,
        }}
      >
        <Image
          src="/logo.png"
          alt="Smart Deal EC ロゴ"
          width={600}
          height={100}
          priority
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          flexWrap: "wrap",
          px: 2,
        }}
      >
        {/* ユーザー用ボタン */}
        <Box
          sx={{
            m: 2,
            p: 2,
            width: { xs: "90%", sm: "40%" },
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#ffffff",
            borderRadius: 3,
            boxShadow: 3,
            border: `1px solid #D3D3D3`,
          }}
        >
          <Button
            component={Link}
            href="/auth/user-signin"
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#E6F4EA",
              color: "#333333",
              borderRadius: 2,
              fontSize: "1.2rem",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#C8E6C9",
              },
            }}
          >
            ユーザー様はこちら
          </Button>
        </Box>

        {/* 企業用ボタン */}
        <Box
          sx={{
            m: 2,
            p: 2,
            width: { xs: "90%", sm: "40%" },
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#ffffff",
            borderRadius: 3,
            boxShadow: 3,
            border: `1px solid #D3D3D3`,
          }}
        >
          <Button
            component={Link}
            href="/auth/company-signin"
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#E6F0FA",
              color: "#333333",
              borderRadius: 2,
              fontSize: "1.2rem",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#D0E2F0",
              },
            }}
          >
            販売企業様はこちら
          </Button>
        </Box>
      </Box>

      {/* フッターアクセント */}
      <Box
        sx={{
          mt: 6,
          py: 3,
          bgcolor: "#FCE8E6",
          textAlign: "center",
          borderTop: "1px solid #D3D3D3",
        }}
      >
        <Typography variant="h6" sx={{ color: "#4A4A4A" }}>
          Smart Deal ECへようこそ
        </Typography>
      </Box>
    </div>
  );
}
