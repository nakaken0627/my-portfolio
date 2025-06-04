export type Product = {
  id: number;
  name: string;
  model_number: string;
  price: number;
  description: string;
  image_name?: string;
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

export type ProductWithCustomization = Product & {
  imageUrl?: string | null;
  customization: ProductCustomization[];
};
