import { createUserCart, getUserCart } from "../../../infrastructure/repositories/user/cartRepository";

export const fetchOrCreateUserCartService = async (userId: number): Promise<number> => {
  const data = await getUserCart(userId);

  if (!data) {
    return await createUserCart(userId);
  }
  return data;
};
