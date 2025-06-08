import { Toolbar } from "@mui/material";

import { UserNav } from "../../../components/navigation/user/UserNav/UserNav";
import { CartContextProvider } from "../../../context/cart-context";

export const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartContextProvider>
      <UserNav />
      <Toolbar />
      <main>{children}</main>
    </CartContextProvider>
  );
};
