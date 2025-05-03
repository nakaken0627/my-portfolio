import { CompanyContextProvider } from "@/context/company-context";
import { CompanyNav } from "components/navigation/CompanyNav";

export const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <CompanyContextProvider>
        <CompanyNav />
        <hr />
        <main>{children}</main>
      </CompanyContextProvider>
    </div>
  );
};
