import { NextFunction, Request, Response } from "express";

import { fetchPaginatedProductsService } from "../../../application/services/user/products/fetchPaginatedProductsService";
import { fetchProductListWithCustomService } from "../../../application/services/user/products/fetchProductListWithCustomService";

export const fetchAllProductsWithCustom = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;
  const userId = req.user.id;

  try {
    const data = await fetchProductListWithCustomService(userId);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const fetchPaginatedProducts = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return;

  const userId = req.user.id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;

  try {
    const data = await fetchPaginatedProductsService(userId, page, limit);
    res.status(200).json(data);

    // const total: { count: number } = await countAllProducts();
    // const products = await findProductsWithCustomization(userId, limit, offset);
    // const enrichedProducts = await Promise.all(
    //   products.map(async (row) => {
    //     const product: UserProductWithCustomization = row.product;
    //     const customization: UserProductCustomization = row.customization;

    //     let imageUrl: string | null = null;

    //     if (product.image_name) {
    //       imageUrl = await getSignedImageUrl(product.image_name);
    //     }
    //     const productWithUrl = { ...product, imageUrl };
    //     return { productWithUrl, customization };
    //   }),
    // );

    // const groupedProducts = enrichedProducts.reduce<GroupedUserProduct>((acc, row) => {
    //   const product: UserProductWithCustomization = row.productWithUrl;
    //   const customization: UserProductCustomization = row.customization;

    //   if (!acc[product.id]) {
    //     acc[product.id] = {
    //       id: product.id,
    //       name: product.name,
    //       company_name: product.company_name,
    //       model_number: product.model_number,
    //       price: product.price,
    //       description: product.description,
    //       image_name: product.image_name,
    //       imageUrl: product.imageUrl,
    //       custom: [],
    //     };
    //   }
    //   if (customization) {
    //     acc[product.id].custom.push({
    //       id: customization.id,
    //       model_number: customization.model_number,
    //       name: customization.name,
    //       price: customization.price,
    //       description: customization.description,
    //       start_date: customization.start_date,
    //       end_date: customization.end_date,
    //     });
    //   }
    //   return acc;
    // }, {});
    // const data = Object.values(groupedProducts);
    // res.status(200).json({ data, total: total.count });
  } catch (err) {
    next(err);
  }
};
