import { CompanyNav } from "components/navigation/CompanyNav";

export const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <CompanyNav />
      <hr />
      <main>{children}</main>
    </div>
  );
};
