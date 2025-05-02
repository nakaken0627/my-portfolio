import { UserLayout } from "../UserLayout";
import { OrderHistory } from "./components/OrderHistory";

export default function UserCart() {
  return (
    <UserLayout>
      <hr />
      <h1>注文履歴</h1>
      <OrderHistory />
    </UserLayout>
  );
}
