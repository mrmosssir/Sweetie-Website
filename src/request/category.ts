import request from "@/request/core";
import type { ApiResponse } from "@/types/api";
import type { ApiAdminCategory, AdminCategory, Category } from "@/types/category";

// Admin 取得商品類別列表
export const getAdminCategoryApi = async (page: number, search: string): Promise<ApiResponse<AdminCategory[]>> => {
  const response = await request.get<ApiAdminCategory[]>("/admin/category", {
    meta: { admin: true },
    params: { page, search },
  });
  const data: AdminCategory[] = (response.data || []).map((item: ApiAdminCategory) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    isEnabled: item.is_enabled,
  }));
  return { ...response, data };
};

// Admin 新增商品類別
export const createAdminCategoryApi = async (category: AdminCategory): Promise<ApiResponse> => {
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
export const updateAdminCategoryApi = async (id: string, category: AdminCategory): Promise<ApiResponse> => {
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

export const getCategoryApi = async (): Promise<Category[]> => {
  const response = await request.get<Category[]>("/categories");
  return response.data;
};
