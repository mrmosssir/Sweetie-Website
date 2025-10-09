import request from "@/request/core";
import type { ApiResponse } from "@/types/api";

// Admin 取得訂單列表
export const getAdminOrdersApi = async (page: number, search: string): Promise<ApiResponse> => {
  return await request.get("/admin/order", { meta: { admin: true }, params: { page, search } });
};

// Admin 更新訂單狀態(只有 isPicked, isPaid, isEnabled 可調整)
export const updateAdminOrderApi = async (id: string, order: any): Promise<ApiResponse> => {
  return await request.put(`/admin/order/${id}`, order, { meta: { admin: true } });
};
