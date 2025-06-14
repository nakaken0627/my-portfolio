import { FetchUserInfoServer } from "./FetchUserInfoServer";
import { UserNavClient } from "./UserNavClient";

export const UserNav = async () => {
  const userInfoElement = await FetchUserInfoServer();

  return <UserNavClient userInfoElement={userInfoElement} />;
};
