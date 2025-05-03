import { CompanyLayout } from "../CompanyLayout";
import { GetCompanyInfo } from "./components/GetCompanyInfo";
import { LogoutFunc } from "./components/LogoutFunc";
import { ProductList } from "./components/ProductList";
import { RegisterFunc } from "./components/RegisterFunc";

export default function MyCompanyPage() {
  return (
    <CompanyLayout>
      <h1>登録済み画面(販売企業様)</h1>
      <GetCompanyInfo />
      <LogoutFunc />
      <hr />
      <ProductList />
      <hr />
      <RegisterFunc />
    </CompanyLayout>
  );
}
