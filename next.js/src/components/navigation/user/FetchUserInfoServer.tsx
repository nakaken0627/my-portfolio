import { fetchUserServer } from "./fetchUserServer";

export const FetchUserInfoServer = async () => {
  const user = await fetchUserServer();
  if (!user) return null;

  return {
    name: user.name === "test" ? "ゲスト" : user.name,
  };
};
