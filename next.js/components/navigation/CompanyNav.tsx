import Link from "next/link";

export const CompanyNav = () => {
  return (
    <div>
      <Link href={"/company/mypage"}>Mypage</Link>
      {"   "}
      <Link href={"/company/orderlist"}>OrderList</Link>
    </div>
  );
};
