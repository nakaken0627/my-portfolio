export type DisplayProductDto = {
  id: number;
  name: string;
  modelNumber: string;
  price: number;
  description: string;
  imageName?: string;
  imageUrl?: string | null;
  custom: ProductCustomDTO[];
};

type ProductCustomDTO = {
  id: number;
  userName: string;
  modelNumber: string;
  name: string;
  price: number;
  description: string;
  startDate: string;
  endDate: string;
};

export type CreateProductDTO = {
  companyId: number;
  modelNumber: string;
  name: string;
  price: number;
  description: string;
  imageName: string;
};

export type CreateCustomProductDTO = {
  productId: number;
  userId: number;
  modelNumber: string;
  productName: string;
  price: number;
  description: string;
  startDate: string;
  endDate: string;
};
