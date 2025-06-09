import { deleteProduct } from "../../../../infrastructure/repositories/company/productRepository.js";
import { deleteImage } from "../../../../infrastructure/s3/s3Service.js";

export const deleteProductsServices = async (companyId: number, productIds: number[]) => {
  return await Promise.all(
    productIds.map(async (id: number) => {
      const result = await deleteProduct(companyId, id);

      if (result) {
        await deleteImage(result);
      }
    }),
  );
};
