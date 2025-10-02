import request from "@/request/core";
import type { ApiResponse } from "@/types/api";

// Admin 取得商品列表
export const getProductsApi = async (page: number, search: string): Promise<ApiResponse> => {
  return await request.get("/admin/product", { meta: { admin: true }, params: { page, search } });
};

// Admin 新增商品
export const createProductApi = async (product: FormData): Promise<ApiResponse> => {
  return await request.post("/admin/product", product, { meta: { admin: true } });
};

// Admin 編輯商品
export const updateProductApi = async (id: string, product: FormData): Promise<ApiResponse> => {
  return await request.put(`/admin/product/${id}`, product, { meta: { admin: true } });
};

// Admin 刪除商品
export const deleteProductApi = async (id: string): Promise<ApiResponse> => {
  return await request.delete(`/admin/product/${id}`, { meta: { admin: true } });
};
