import { UserNav } from "@/components/navigation/user/UserNav";
// import { UserNav } from "../../components/navigation/user/UserNav";
import { CartContextProvider } from "@/context/cart-context";
import { Toolbar } from "@mui/material";

export const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartContextProvider>
      <UserNav />
      <Toolbar />
      <main>{children}</main>
    </CartContextProvider>
  );
};
