import request from "@/request/core";
import type { ApiResponse } from "@/types/api";
import type { ApiProduct, ApiProductSimple, Product, ProductSimple } from "@/types/product";

// Admin 取得商品列表
export const getAdminProductsApi = async (page: number, search: string): Promise<ApiResponse> => {
  return await request.get("/admin/product", { meta: { admin: true }, params: { page, search } });
};

// Admin 新增商品
export const createAdminProductApi = async (product: FormData): Promise<ApiResponse> => {
  return await request.post("/admin/product", product, { meta: { admin: true } });
};

// Admin 編輯商品
export const updateAdminProductApi = async (id: string, product: FormData): Promise<ApiResponse> => {
  return await request.put(`/admin/product/${id}`, product, { meta: { admin: true } });
};

// Admin 刪除商品
export const deleteAdminProductApi = async (id: string): Promise<ApiResponse> => {
  return await request.delete(`/admin/product/${id}`, { meta: { admin: true } });
};

// Client 取得商品列表
export const getProductsApi = async (page: number): Promise<ProductSimple[]> => {
  const response = await request.get<ProductSimple[]>("/products", { params: { page } });
  return response.data.map(
    (item: ApiProductSimple) =>
      ({
        id: item.id,
        name: item.name,
        price: item.price,
        originPrice: item.origin_price,
        image: item.image_url,
        rating: item.rating,
      }) as ProductSimple,
  );
};

// Client 取得新商列表
export const getNewProductsApi = async (): Promise<ProductSimple[]> => {
  const response = await request.get<ProductSimple[]>("/products/new");
  return response.data.map(
    (item: ApiProductSimple) =>
      ({
        id: item.id,
        name: item.name,
        price: item.price,
        originPrice: item.origin_price,
        image: item.image_url,
        rating: item.rating,
      }) as ProductSimple,
  );
};

// Client 取得熱門商品列表
export const getHotProductsApi = async (): Promise<ProductSimple[]> => {
  const response = await request.get<ProductSimple[]>("/products/hot");
  return response.data.map(
    (item: ApiProductSimple) =>
      ({
        id: item.id,
        name: item.name,
        price: item.price,
        originPrice: item.origin_price,
        image: item.image_url,
        rating: item.rating,
      }) as ProductSimple,
  );
};

// Client 透過 ids 取得多個商品
export const getProductsIdsApi = async (ids: string[]): Promise<Product[]> => {
  const response = await request.post("/products/ids", { ids });
  return response.data.map(
    (item: ApiProduct) =>
      ({
        id: item.id,
        name: item.name,
        category: item.category,
        categoryId: item.category,
        originPrice: item.origin_price,
        price: item.price,
        unit: item.unit,
        description: item.description,
        content: item.content,
        isEnabled: item.is_enabled,
        image: item.image_url,
        rating: item.rating,
        isHot: item.is_hot,
        isNew: item.is_new,
        stock: item.stock,
      }) as Product,
  );
};

// Client 取得單一商品詳情
export const getProductDetail = async (id: string): Promise<Product> => {
  const response = await request.get(`/product/${id}`);
  const item: ApiProduct = response.data;
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    categoryId: item.category,
    originPrice: item.origin_price,
    price: item.price,
    unit: item.unit,
    description: item.description,
    content: item.content,
    isEnabled: item.is_enabled,
    image: item.image_url,
    rating: item.rating,
    isHot: item.is_hot,
    isNew: item.is_new,
    stock: item.stock,
  } as Product;
};
