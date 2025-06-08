import { GetUserInfoServer } from "./GetUserInfoServer";
import { UserNavClient } from "./UserNavClient";

export const UserNav = async () => {
  const userInfoElement = await GetUserInfoServer();

  return <UserNavClient userInfoElement={userInfoElement} />;
};
