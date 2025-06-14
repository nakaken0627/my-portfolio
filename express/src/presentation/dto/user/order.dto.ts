type OrderUserProduct = {
  id: number;
  name: string;
  companyName: string;
  modelNumber: string;
  price: number;
  quantity: number;
};

type OrderUserCustomProduct = {
  id: number;
  modelNumber: string;
  name: string;
  price: number;
};

export type TransformedUserOrderDTO = {
  orderId: number;
  products: Array<OrderUserProduct & { custom: OrderUserCustomProduct | null }>;
};
