import { ProductCustom } from "../../../../domain/models/company/productModel.js";
import { fetchMergedCompanyProducts } from "../../../../infrastructure/repositories/company/productRepository.js";
import { getSignedImageUrl } from "../../../../infrastructure/s3/s3Service.js";
import { DisplayProductDto } from "../../../../presentation/dto/company/product.dto.js";

type RowData = {
  product: Omit<DisplayProductDto, "customization" | "imageUrl">;
  customization: ProductCustom;
};

type GroupedProduct = Record<number, DisplayProductDto>;

export const fetchDisplayProductsService = async (companyId: number): Promise<DisplayProductDto[]> => {
  const products: RowData[] = await fetchMergedCompanyProducts(companyId);

  const enrichedProducts = await Promise.all(
    products.map(async ({ product, customization }) => {
      const imageUrl = product.image_name ? await getSignedImageUrl(product.image_name) : null;
      return { productWithUrl: { ...product, imageUrl }, customization };
    }),
  );
  const groupedProducts = enrichedProducts.reduce<GroupedProduct>((acc, { productWithUrl, customization }) => {
    if (!acc[productWithUrl.id]) {
      acc[productWithUrl.id] = {
        ...productWithUrl,
        custom: [],
      };
    }
    if (customization) {
      acc[productWithUrl.id].custom.push(customization);
    }
    return acc;
  }, {});

  return Object.values(groupedProducts);
};
