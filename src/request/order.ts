import request from "@/request/core";
import type { ApiResponse } from "@/types/api";

// Admin 取得訂單列表
export const getOrdersApi = async (page: number, search: string): Promise<ApiResponse> => {
  return await request.get("/admin/order", { meta: { admin: true }, params: { page, search } });
};
