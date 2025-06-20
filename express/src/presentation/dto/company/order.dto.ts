type OrderProductWithCustom = {
  id: number;
  orderProductId: number;
  name: string;
  userName: string;
  modelNumber: string;
  price: number;
  quantity: number;
  custom: OrderCustom | null;
};

type OrderCustom = {
  id: number;
  modelNumber: string;
  name: string;
  price: number;
};

export type TransformedOrders = {
  orderId: number;
  products: OrderProductWithCustom[];
};
