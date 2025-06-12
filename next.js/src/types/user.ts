export type UserProductWithCustom = {
  id: number;
  name: string;
  companyName: string;
  modelNumber: string;
  price: number;
  description: string;
  imageName?: string;
  imageUrl?: string | null;
  custom: UserProductCustom[];
};

export type UserProductCustom = {
  id: number;
  modelNumber: string;
  name: string;
  price: number;
  description: string;
  startDate: string;
  endDate: string;
};

export type OrderProduct = {
  id: number;
  name: string;
  companyName: string;
  modelNumber: string;
  price: number;
  quantity: number;
};

export type OrderCustom = {
  id: number;
  modelNumber: string;
  name: string;
  price: number;
};

export type Transformed = {
  orderId: number;
  products: (OrderProduct & { custom: OrderCustom | null })[];
};
