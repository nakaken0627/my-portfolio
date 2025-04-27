import { UserLayout } from "../UserLayout";
import { AddedProducts } from "./components/AddedProducts";

export default function UserCart() {
  return (
    <>
      <UserLayout>
        <h1></h1>
        <hr />
        <h1>マイカート</h1>
        <AddedProducts />
      </UserLayout>
    </>
  );
}
