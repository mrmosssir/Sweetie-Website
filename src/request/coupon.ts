import request from "@/request/core";
import type { ApiResponse } from "@/types/api";

// Admin 取得優惠券列表
export const getCouponsApi = async (page: number, search: string): Promise<ApiResponse> => {
  return await request.get("/admin/coupon", { meta: { admin: true }, params: { page, search } });
};

// Admin 新增優惠券
export const createCouponApi = async (coupon: FormData): Promise<ApiResponse> => {
  return await request.post("/admin/coupon", coupon, { meta: { admin: true } });
};

// Admin 編輯優惠券
export const updateCouponApi = async (id: string, coupon: FormData): Promise<ApiResponse> => {
  return await request.put(`/admin/coupon/${id}`, coupon, { meta: { admin: true } });
};

// Admin 刪除優惠券
export const deleteCouponApi = async (id: string): Promise<ApiResponse> => {
  return await request.delete(`/admin/coupon/${id}`, { meta: { admin: true } });
};
