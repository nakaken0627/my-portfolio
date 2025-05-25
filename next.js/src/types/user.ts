export type UserProductWithCustomization = {
  id: number;
  name: string;
  company_name: string;
  model_number: string;
  price: number;
  description: string;
  image_name?: string;
  imageUrl?: string | null;
  customization: UserProductCustomization[];
};

export type UserProductCustomization = {
  id: number;
  model_number: string;
  name: string;
  price: number;
  description: string;
  start_date: string;
  end_date: string;
};
