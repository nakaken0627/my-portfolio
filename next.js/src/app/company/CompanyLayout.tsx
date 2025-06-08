import { CompanyNav } from "@/components/navigation/company/CompanyNav";
import { Toolbar } from "@mui/material";

export const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <CompanyNav />
      <Toolbar />
      <main>{children}</main>
    </div>
  );
};
