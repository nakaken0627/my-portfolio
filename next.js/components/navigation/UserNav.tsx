import Link from "next/link";

export const UserNav = () => {
  return (
    <div>
      <Link href="/user/mypage">Mypage</Link>
      {"   "}
      <Link href="/user/mycart">Cart</Link>
      {"   "}
      <Link href="/user/myorderhistory">OrderHistory</Link>
    </div>
  );
};
