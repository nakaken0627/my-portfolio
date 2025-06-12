type OrderUserProduct = {
  id: number;
  name: string;
  company_name: string;
  model_number: string;
  price: number;
  quantity: number;
};

type OrderUserCustomProduct = {
  id: number;
  model_number: string;
  name: string;
  price: number;
};

export type OrderedUserRow = {
  order_id: number;
  product: OrderUserProduct;
  custom: OrderUserCustomProduct;
};
