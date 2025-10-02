import axios, { InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import router from "@/router";
import { auth } from "../firebase";
import type { ApiResponse } from "../types/api";

// Declare custom meta field in AxiosRequestConfig
declare module "axios" {
  interface AxiosRequestConfig {
    meta?: {
      admin?: boolean;
    };
  }
}

// Create axios instance
const request = axios.create({
  baseURL: `${import.meta.env.VITE_API_PATH}`,
  withCredentials: true,
});

// Request interceptors
request.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (config.meta?.admin) {
    const user = auth.currentUser;

    if (!user) {
      router.push("/login");
      return Promise.reject(new Error("No user logged in"));
    }

    const token = await user.getIdToken();
    config.headers["X-Auth-Token"] = `Bearer ${token}`;
  }

  return config;
});

// Response interceptors
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response.data as any;
  },
  (error) => {
    router.push("/login");
    return Promise.reject(error);
  }
);

export default request;
