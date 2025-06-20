export type ProductWithCustomization = {
  id: number;
  name: string;
  modelNumber: string;
  price: number;
  description: string;
  imageUrl: string;
  custom: ProductCustomizations[];
};

export type ProductCustomizations = {
  id: number;
  userName?: string;
  modelNumber: string;
  name: string;
  price: number;
  description: string;
  startDate: string;
  endDate: string;
};

export type OrderProduct = {
  id: number;
  orderProductId: number;
  name: string;
  userName: string;
  modelNumber: string;
  price: number;
  quantity: number;
  custom: {
    id: number;
    modelNumber: string;
    name: string;
    price: number;
  } | null;
};

export type OrderTransformed = {
  orderId: number;
  products: OrderProduct[];
};
