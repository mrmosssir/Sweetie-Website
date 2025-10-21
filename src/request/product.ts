import request from "@/request/core";
import type { ApiResponse } from "@/types/api";

// Admin 取得商品列表
export const getAdminProductsApi = async (page: number, search: string): Promise<ApiResponse> => {
  return await request.get("/admin/product", { meta: { admin: true }, params: { page, search } });
};

// Admin 新增商品
export const createAdminProductApi = async (product: FormData): Promise<ApiResponse> => {
  return await request.post("/admin/product", product, { meta: { admin: true } });
};

// Admin 編輯商品
export const updateAdminProductApi = async (
  id: string,
  product: FormData
): Promise<ApiResponse> => {
  return await request.put(`/admin/product/${id}`, product, { meta: { admin: true } });
};

// Admin 刪除商品
export const deleteAdminProductApi = async (id: string): Promise<ApiResponse> => {
  return await request.delete(`/admin/product/${id}`, { meta: { admin: true } });
};

// Client 取得商品列表
export const getProductsApi = async (page: number): Promise<ApiResponse> => {
  return await request.get("/products", { params: { page } });
};

// Client 取得單一商品詳情
export const getProductApi = async (id: string): Promise<ApiResponse> => {
  return await request.get(`/product/${id}`);
};
