import { CompanyLayout } from "../CompanyLayout";
import { DisplayOrderList } from "./components/DisplayOrderList";

export const OrderList = () => {
  return (
    <CompanyLayout>
      <DisplayOrderList />
    </CompanyLayout>
  );
};

export default OrderList;
