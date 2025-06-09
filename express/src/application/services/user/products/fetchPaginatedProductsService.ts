import { UserProductRow } from "../../../../domain/models/user/productModel";
import {
  countAllProducts,
  getPaginatedProductsWithCustom,
} from "../../../../infrastructure/repositories/user/productRepository";
import { getSignedImageUrl } from "../../../../infrastructure/s3/s3Service";
import { GroupedProductDTO, UserProductWithCustomDTO } from "../../../../presentation/dto/user/product.dto";

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
      const { product, customization } = row;

      //   const product: UserProduct = row.product;
      //   const customization: UserCustomProduct | null = row.customization;

      const imageUrl = product.image_name ? await getSignedImageUrl(product.image_name) : null;

      //   const productWithUrl = { ...product, imageUrl };
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
        customization: customization
          ? {
              id: customization.id,
              modelNumber: customization.model_number,
              name: customization.name,
              price: customization.price,
              description: customization.description,
              startDate: customization.start_date,
              endDate: customization.end_date,
            }
          : null,
      };
    }),
  );

  const groupedProducts = enrichedProducts.reduce<GroupedProductDTO>((acc, row) => {
    // const product: UserProductWithCustomization = row.product;
    // const customization: UserProductCustomization = row.customization;

    const { product, customization } = row;

    if (!acc[product.id]) {
      acc[product.id] = {
        ...product,
        custom: [],
        // id: product.id,
        // name: product.name,
        // company_name: product.company_name,
        // model_number: product.model_number,
        // price: product.price,
        // description: product.description,
        // image_name: product.image_name,
        // imageUrl: product.imageUrl,
        // custom: [],
      };
    }
    if (customization) {
      acc[product.id].custom.push(
        customization,
        //     {
        //     id: customization.id,
        //     model_number: customization.model_number,
        //     name: customization.name,
        //     price: customization.price,
        //     description: customization.description,
        //     start_date: customization.start_date,
        //     end_date: customization.end_date,
        //   }
      );
    }
    return acc;
  }, {});
  return { data: Object.values(groupedProducts), total };
};
