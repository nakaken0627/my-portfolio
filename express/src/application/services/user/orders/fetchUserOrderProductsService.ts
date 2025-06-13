import { UserCartProduct } from "../../../../domain/models/user/cartModel.js";
import { getUserCartProducts } from "../../../../infrastructure/repositories/user/cartRepository.js";
import { UserCartProductDTO } from "../../../../presentation/dto/user/cart.dto.js";

export const fetchUserOrderProductsService = async (cartId: number): Promise<UserCartProductDTO[]> => {
  const rows: UserCartProduct[] = await getUserCartProducts(cartId);

  const data: UserCartProductDTO[] = rows.map((row) => {
    return {
      productId: row.product_id,
      customizationId: row.customization_id,
      quantity: row.quantity,
    };
  });
  return data;
};
