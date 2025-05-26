import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/components/lib/api";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Box, Button, Tooltip } from "@mui/material";

export const GuestLoginFunc = () => {
  const router = useRouter();

  const handleGuestLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "test",
          password: "test",
        }),
      });
      if (response.ok) {
        router.push("/user/mypage");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Tooltip title="登録なしですぐに試せます" arrow>
        <Button
          onClick={handleGuestLogin}
          variant="outlined"
          color="secondary"
          fullWidth
          startIcon={<PersonOutlineIcon />}
          sx={{
            borderWidth: 2,
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          ゲストとして試す
        </Button>
      </Tooltip>
    </Box>
  );
};
