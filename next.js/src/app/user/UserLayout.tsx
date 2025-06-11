import { UserNav } from "@/components/navigation/user/UserNav";
// import { CartContextProvider } from "@/context/cart-context";
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
        {/* {await UserNav()} */}
        <Toolbar />
        {/* <main> */}
        {children}
        {/* </main> */}
        {/* <p>a</p> */}
      </CartContextClientWrapper>
      {/* <CartContextProvider>
        <main>{children}</main>
      </CartContextProvider> */}
    </div>
  );
}
