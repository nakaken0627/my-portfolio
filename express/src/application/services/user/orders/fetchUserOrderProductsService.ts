import { UserCartProduct } from "../../../../domain/models/user/cartModel";
import { getUserCartProducts } from "../../../../infrastructure/repositories/user/cartRepository";
import { UserCartProductDTO } from "../../../../presentation/dto/user/cart.dto";

export const fetchUserOrderProductsService = async (cartId: number): Promise<UserCartProductDTO[]> => {
  const rows: UserCartProduct[] = await getUserCartProducts(cartId);
  if (!rows || rows.length === 0) {
    throw new Error("データが見つかりません");
  }
  const data: UserCartProductDTO[] = rows.map((row) => {
    return {
      productId: row.product_id,
      customizationId: row.customization_id,
      quantity: row.quantity,
    };
  });
  return data;
};
