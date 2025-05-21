export type DefaultProduct = {
  id: number;
  name: string;
  model_number: string;
  default_price: number;
  description: string;
  customization: ProductCustomization[];
};

export type ProductCustomization = {
  id: number;
  user_name: string;
  model_number: string;
  name: string;
  price: number;
  description: string;
  start_date: string;
  end_date: string;
};
