import { CompanyContextProvider } from "@/context/company-context";
import { Toolbar } from "@mui/material";
import { CompanyNav } from "components/navigation/CompanyNav";

export const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <CompanyContextProvider>
        <CompanyNav />
        <Toolbar />
        <main>{children}</main>
      </CompanyContextProvider>
    </div>
  );
};
