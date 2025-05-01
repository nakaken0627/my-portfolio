import { UserLayout } from "../UserLayout";
import ProductsList from "./components/ProductsList";

export default function MyUserPage() {
  return (
    <div>
      <UserLayout>
        <>ヘッダー</>
        <hr />
        <ProductsList />
      </UserLayout>
    </div>
  );
}
