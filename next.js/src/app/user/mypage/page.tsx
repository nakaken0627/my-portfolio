import { UserLayout } from "../UserLayout";
import { GetUserInfo } from "./components/GetUserInfo";
import LogoutFunc from "./components/LogoutFunc";
import ProductsList from "./components/ProductsList";

export default function MyUserPage() {
  return (
    <div>
      <UserLayout>
        <>ヘッダー</>
        <hr />
        <h1>マイページ</h1>
        <GetUserInfo />
        <LogoutFunc />
        <hr />
        <ProductsList />
      </UserLayout>
    </div>
  );
}
