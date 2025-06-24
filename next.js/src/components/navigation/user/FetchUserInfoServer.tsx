import { fetchUserServer } from "./fetchUserServer";

export const FetchUserInfoServer = async () => {
  const user = await fetchUserServer();

  return {
    name: user.name === "test" ? "ゲスト" : user.name,
  };
};
