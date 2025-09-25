export type ApiProduct = {
  id: string;
  name: string;
  category: string;
  origin_price: string | number;
  price: string | number;
  unit: string;
  description: string;
  content: string;
  is_enabled: boolean;
  image_url: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  originPrice: number;
  price: number;
  unit: string;
  description: string;
  content: string;
  isEnabled: boolean;
  imageUrl: string;
};
