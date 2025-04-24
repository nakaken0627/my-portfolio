import Link from "next/link";

export const UserNav = () => {
  return (
    <div>
      <Link href="/MyUserPage">Mypage</Link>
      {"   "}
      <Link href="/UserCart">Cart</Link>
    </div>
  );
};
