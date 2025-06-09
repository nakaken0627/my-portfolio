type OrderProductWithCustom = {
  id: number;
  orderProductId: number;
  name: string;
  userName: string;
  model_number: string;
  price: number;
  quantity: number;
  custom: OrderCustom | null;
};

type OrderCustom = {
  id: number;
  model_number: string;
  name: string;
  price: number;
};

export type TransformedOrders = {
  orderId: number;
  products: OrderProductWithCustom[];
};
