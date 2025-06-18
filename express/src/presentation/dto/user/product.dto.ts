export type UserCustomProductDTO = {
  id: number;
  modelNumber: string;
  name: string;
  price: number;
  description: string;
  startDate: string;
  endDate: string;
};

export type UserProductWithCustomDTO = {
  id: number;
  name: string;
  companyName: string;
  modelNumber: string;
  price: number;
  description: string;
  imageName?: string;
  imageUrl?: string | null;
  custom: UserCustomProductDTO[];
};

export type GroupedProductDTO = Record<number, UserProductWithCustomDTO>;
