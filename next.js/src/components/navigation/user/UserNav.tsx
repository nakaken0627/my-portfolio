import { FetchUserInfoServer } from "./FetchUserInfoServer";
import { UserNavClient } from "./UserNavClient";

export const UserNav = async () => {
  const userInfo = await FetchUserInfoServer();
  return <UserNavClient userInfo={userInfo} />;
};
