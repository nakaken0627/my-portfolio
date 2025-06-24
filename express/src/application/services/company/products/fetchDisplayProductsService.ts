import { Product, ProductCustom } from "../../../../domain/models/company/productModel.js";
import { fetchMergedCompanyProducts } from "../../../../infrastructure/repositories/company/productRepository.js";
import { getSignedImageUrl } from "../../../../infrastructure/s3/s3Service.js";
import { DisplayProductDto } from "../../../../presentation/dto/company/product.dto.js";

type RowData = {
  product: Omit<Product, "customization" | "imageUrl">;
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
        id: productWithUrl.id,
        name: productWithUrl.name,
        modelNumber: productWithUrl.model_number,
        price: productWithUrl.price,
        description: productWithUrl.description,
        imageName: productWithUrl.image_name,
        imageUrl: productWithUrl.imageUrl,
        custom: [],
      };
    }

    if (customization) {
      const customData = {
        id: customization.id,
        userName: customization.user_name,
        modelNumber: customization.model_number,
        name: customization.name,
        price: customization.price,
        description: customization.description,
        startDate: customization.start_date,
        endDate: customization.end_date,
      };

      acc[productWithUrl.id].custom.push(customData);
    }
    return acc;
  }, {});

  return Object.values(groupedProducts);
};
