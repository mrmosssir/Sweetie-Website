import request from "@/request/core";
import type { ApiResponse } from "@/types/api";
import type { ApiAdminAdvertise, ApiAdvertise, AdminAdvertise, Advertise } from "@/types/advertise";

// Admin 取得廣告列表
export const getAdminAdvertiseApi = async (page: number, search: string): Promise<ApiResponse<AdminAdvertise[]>> => {
  const response = await request.get<ApiAdminAdvertise[]>("/admin/advertise", {
    meta: { admin: true },
    params: { page, search },
  });
  const data: AdminAdvertise[] = (response.data || []).map((item: ApiAdminAdvertise) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    isEnabled: item.is_enabled,
  }));
  return { ...response, data };
};

// Admin 新增廣告
export const createAdminAdvertiseApi = async (advertise: AdminAdvertise): Promise<ApiResponse> => {
  return await request.post(
    "/admin/advertise",
    {
      name: advertise.name,
      image: advertise.image,
      link: advertise.link,
      is_enabled: advertise.isEnabled,
    },
    { meta: { admin: true } },
  );
};

// Admin 編輯廣告
export const updateAdminAdvertiseApi = async (id: string, advertise: AdminAdvertise): Promise<ApiResponse> => {
  return await request.put(
    `/admin/advertise/${id}`,
    {
      name: advertise.name,
      image: advertise.image,
      link: advertise.link,
      is_enabled: advertise.isEnabled,
    },
    { meta: { admin: true } },
  );
};

// Admin 刪除廣告
export const deleteAdminAdvertiseApi = async (id: string): Promise<ApiResponse> => {
  return await request.delete(`/admin/advertise/${id}`, { meta: { admin: true } });
};

// 取得廣告列表
export const getAdvertiseApi = async (): Promise<Advertise[]> => {
  const response = await request.get<ApiAdvertise[]>("/advertises");
  const data: Advertise[] = (response.data || []).map((item: ApiAdvertise) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    link: item.link,
  }));
  return data;
};
