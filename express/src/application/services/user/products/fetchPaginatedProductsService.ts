import { UserProductRow } from "../../../../domain/models/user/productModel.js";
import {
  countAllProducts,
  getPaginatedProductsWithCustom,
} from "../../../../infrastructure/repositories/user/productRepository.js";
import { getSignedImageUrl } from "../../../../infrastructure/s3/s3Service.js";
import { GroupedProductDTO, UserProductWithCustomDTO } from "../../../../presentation/dto/user/product.dto.js";

export const fetchPaginatedProductsService = async (
  userId: number,
  page: number,
  limit: number,
): Promise<{ data: UserProductWithCustomDTO[]; total: number }> => {
  const offset = (page - 1) * limit;
  const total = await countAllProducts();

  const rows: UserProductRow[] = await getPaginatedProductsWithCustom(userId, limit, offset);

  const enrichedProducts = await Promise.all(
    rows.map(async (row) => {
      const { product, custom } = row;

      const imageUrl = product.image_name ? await getSignedImageUrl(product.image_name) : null;

      return {
        product: {
          id: product.id,
          name: product.name,
          companyName: product.company_name,
          modelNumber: product.model_number,
          price: product.price,
          description: product.description,
          imageName: product.image_name,
          imageUrl,
        },
        custom: custom
          ? {
              id: custom.id,
              modelNumber: custom.model_number,
              name: custom.name,
              price: custom.price,
              description: custom.description,
              startDate: custom.start_date,
              endDate: custom.end_date,
            }
          : null,
      };
    }),
  );

  const groupedProducts = enrichedProducts.reduce<GroupedProductDTO>((acc, row) => {
    const { product, custom } = row;

    if (!acc[product.id]) {
      acc[product.id] = {
        ...product,
        custom: [],
      };
    }

    if (custom) {
      acc[product.id].custom.push(custom);
    }

    return acc;
  }, {});
  return { data: Object.values(groupedProducts), total };
};
