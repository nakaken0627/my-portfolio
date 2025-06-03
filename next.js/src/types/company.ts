export type DefaultProductWithCustomization = {
  id: number;
  name: string;
  model_number: string;
  price: number;
  description: string;
  imageUrl: string;
  customization: ProductCustomizations[];
};

export type ProductCustomizations = {
  id: number;
  user_name: string;
  model_number: string;
  name: string;
  price: number;
  description: string;
  start_date: string;
  end_date: string;
};

export type OrderProduct = {
  id: number;
  orderProductId: number;
  name: string;
  userName: string;
  model_number: string;
  price: number;
  quantity: number;
  customization: {
    id: number;
    model_number: string;
    name: string;
    price: number;
  } | null;
};

export type OrderTransformed = {
  orderId: number;
  products: OrderProduct[];
};
