import request from "./core";
import { ApiResponse } from "@/types/api";

export const uploadFileApi = async (file: File, type: string): Promise<ApiResponse> => {
  const formData: FormData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  return await request.post("/admin/upload", formData, { meta: { admin: true } });
};
