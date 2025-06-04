import { ProductCustomization } from "../../../domain/models/productModel.js";
import { fetchMergedCompanyProducts } from "../../../infrastructure/repositories/productRepository.js";
import { getSignedImageUrl } from "../../../infrastructure/s3/s3Service.js";
import { DisplayProductDto } from "../../../presentation/dto/product.dto.js";

type RowData = {
  product: Omit<DisplayProductDto, "customization" | "imageUrl">;
  customization: ProductCustomization;
};

type GroupedProduct = Record<number, DisplayProductDto>;

export const fetchDisplayProducts = async (companyId: number): Promise<DisplayProductDto[]> => {
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
        customization: [],
      };
    }
    if (customization) {
      acc[productWithUrl.id].customization.push(customization);
    }
    return acc;
  }, {});

  return Object.values(groupedProducts);
};
