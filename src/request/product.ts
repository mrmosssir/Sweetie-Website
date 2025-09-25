import request from "@/request/core";
import type { ApiResponse } from "@/types/api";

// Admin 取得商品列表
export const getProductList = async (page: number): Promise<ApiResponse> => {
  return await request.get("/admin/product", { meta: { admin: true }, params: { page } });
};
