import GetUserInfo from "./components/GetUserInfo";
import LogoutFunc from "./components/LogoutFunc";
import ProductsList from "./components/ProductsList";

export default function MyUserPage() {
  return (
    <>
      <h1>マイページ</h1>
      <GetUserInfo />
      <LogoutFunc />
      <hr />
      <ProductsList />
    </>
  );
}
