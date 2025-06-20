import { UserNav } from "@/components/navigation/user/UserNav";
import { CartContextClientWrapper } from "@/context/CartContextClientWrapper";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CartContextClientWrapper>
        <UserNav />
        {children}
      </CartContextClientWrapper>
    </div>
  );
}
