export type UserProduct = {
  id: number;
  name: string;
  company_name: string;
  model_number: string;
  price: number;
  description: string;
  image_name?: string;
};

export type UserCustomProduct = {
  id: number;
  model_number: string;
  name: string;
  price: number;
  description: string;
  start_date: string;
  end_date: string;
};

export type UserProductRow = {
  product: UserProduct;
  custom: UserCustomProduct | null;
};
