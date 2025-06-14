import { UserNav } from "@/components/navigation/user/UserNav";
import { CartContextClientWrapper } from "@/context/CartContextClientWrapper";
import { Toolbar } from "@mui/material";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CartContextClientWrapper>
        <UserNav />
        <Toolbar />
        {children}
      </CartContextClientWrapper>
    </div>
  );
}
