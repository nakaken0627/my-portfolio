import { UserCustomProduct, UserProduct, UserProductRow } from "../../../../domain/models/user/productModel.js";
import { getUserProductListWithCustom } from "../../../../infrastructure/repositories/user/productRepository.js";
import { GroupedProductDTO } from "../../../../presentation/dto/user/product.dto.js";

export const fetchProductListWithCustomService = async (userId: number): Promise<GroupedProductDTO[]> => {
  const rows: UserProductRow[] = await getUserProductListWithCustom(userId);

  const groupedProducts = rows.reduce<GroupedProductDTO>((acc, row) => {
    const product: UserProduct = row.product;
    const custom: UserCustomProduct | null = row.custom;

    if (!product) return acc;

    if (!acc[product.id]) {
      acc[product.id] = {
        id: product.id,
        name: product.name,
        companyName: product.company_name,
        modelNumber: product.model_number,
        price: product.price,
        description: product.description,
        custom: [],
      };
    }

    if (custom) {
      acc[product.id].custom.push({
        id: custom.id,
        modelNumber: custom.model_number,
        name: custom.name,
        price: custom.price,
        description: custom.description,
        startDate: custom.start_date,
        endDate: custom.end_date,
      });
    }
    return acc;
  }, {});

  return Object.values(groupedProducts);
};
