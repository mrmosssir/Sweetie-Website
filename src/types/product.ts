export type ApiProduct = {
  id: string;
  name: string;
  category: string;
  category_id: string;
  origin_price: string | number;
  price: string | number;
  unit: string;
  description: string;
  content: string;
  is_enabled: boolean;
  image_url: string;
  rating: string | number;
  is_new: boolean;
  is_hot: boolean;
  stock: number;
};

export type AdminProduct = {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  originPrice: number;
  price: number;
  unit: string;
  description: string;
  content: string;
  isEnabled: boolean;
  imageUrl: string;
  rating: number;
  isNew: boolean;
  isHot: boolean;
  stock: number;
};

export type ApiProductSimple = {
  id: string;
  name: string;
  price: string | number;
  origin_price: string | number;
  image_url: string;
  rating: string | number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  originPrice: number;
  price: number;
  unit: string;
  description: string;
  content: string;
  isEnabled: boolean;
  image: string;
  rating: number;
  isHot: boolean;
  isNew: boolean;
  stock: number;
};

export type ProductSimple = {
  id: string;
  name: string;
  originPrice: number;
  price: number;
  image: string;
  rating: number;
};
