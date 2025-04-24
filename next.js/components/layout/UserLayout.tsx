import { UserNav } from "../navigation/UserNav";

export const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
      <UserNav />
    </div>
  );
};
