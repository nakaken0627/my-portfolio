type OrderProduct = {
  id: number;
  orderProductId: number;
  name: string;
  userName: string;
  model_number: string;
  price: number;
  quantity: number;
};

type OrderCustom = {
  id: number;
  model_number: string;
  name: string;
  price: number;
};

export type OrderRow = {
  order_id: number;
  product: OrderProduct;
  custom: OrderCustom;
};
