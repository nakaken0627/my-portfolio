import { CompanyNavClient } from "./CompanyNavClient";
import { FetchCompanyInfoServer } from "./FetchCompanyInfoServer";

export const CompanyNav = async () => {
  const companyInfo = await FetchCompanyInfoServer();

  return <CompanyNavClient companyInfo={companyInfo} />;
};
