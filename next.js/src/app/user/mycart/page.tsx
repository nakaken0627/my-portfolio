import { UserLayout } from "../UserLayout";
import { AddedProducts } from "./components/AddedProducts";

export default function UserCart() {
  return (
    <UserLayout>
      <hr />
      <h1>マイカート</h1>
      <AddedProducts />
    </UserLayout>
  );
}
