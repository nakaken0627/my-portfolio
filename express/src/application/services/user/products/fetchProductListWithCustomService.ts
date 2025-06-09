import { UserCustomProduct, UserProduct, UserProductRow } from "../../../../domain/models/user/productModel";
import { getUserProductListWithCustom } from "../../../../infrastructure/repositories/user/productRepository";
import { GroupedProductDTO } from "../../../../presentation/dto/user/product.dto";

export const fetchProductListWithCustomService = async (userId: number): Promise<GroupedProductDTO[]> => {
  const rows: UserProductRow[] = await getUserProductListWithCustom(userId);

  const groupedProducts = rows.reduce<GroupedProductDTO>((acc, row) => {
    const product: UserProduct = row.product;
    const customization: UserCustomProduct | null = row.customization;

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

    if (customization) {
      acc[product.id].custom.push({
        id: customization.id,
        modelNumber: customization.model_number,
        name: customization.name,
        price: customization.price,
        description: customization.description,
        startDate: customization.start_date,
        endDate: customization.end_date,
      });
    }
    return acc;
  }, {});

  return Object.values(groupedProducts);
};
