export type DefaultProductWithCustomization = {
  id: number;
  name: string;
  model_number: string;
  price: number;
  description: string;
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
