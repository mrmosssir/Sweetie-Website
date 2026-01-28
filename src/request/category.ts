import request from "@/request/core";
import type { ApiResponse } from "@/types/api";
import type { ApiCategory, Category } from "@/types/category";

// Admin 取得商品類別列表
export const getAdminCategoryApi = async (page: number, search: string): Promise<ApiResponse<Category[]>> => {
  const response = await request.get<ApiCategory[]>("/admin/category", {
    meta: { admin: true },
    params: { page, search },
  });
  const data: Category[] = (response.data || []).map((item: ApiCategory) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    isEnabled: item.is_enabled,
  }));
  return { ...response, data };
};

// Admin 新增商品類別
export const createAdminCategoryApi = async (category: Category): Promise<ApiResponse> => {
  return await request.post(
    "/admin/category",
    {
      name: category.name,
      image: category.image,
      is_enabled: category.isEnabled,
    },
    { meta: { admin: true } },
  );
};

// Admin 編輯商品類別
export const updateAdminCategoryApi = async (id: string, category: Category): Promise<ApiResponse> => {
  return await request.put(
    `/admin/category/${id}`,
    {
      name: category.name,
      image: category.image,
      is_enabled: category.isEnabled,
    },
    { meta: { admin: true } },
  );
};

// Admin 刪除商品類別
export const deleteAdminCategoryApi = async (id: string): Promise<ApiResponse> => {
  return await request.delete(`/admin/category/${id}`, { meta: { admin: true } });
};
