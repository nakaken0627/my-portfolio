import { CompanyNav } from "@/components/navigation/company/CompanyNav";

export const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <CompanyNav />
      <main>{children}</main>
    </div>
  );
};
