import axios, { InternalAxiosRequestConfig, type AxiosRequestConfig } from "axios";
import router from "@/router";

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
  baseURL: `${import.meta.env.VITE_APP_APIPATH}/api/`,
  withCredentials: true,
});

// Request interceptors
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.meta?.admin) {
    config.url += `${import.meta.env.VITE_APP_CUSTOMPATH}/admin`;
  }
  return config;
});

// Response interceptors
request.interceptors.response.use(
  (response) => {
    if (!response.data.success) {
      if (
        response.data.message.includes("驗證錯誤") ||
        response.data.message.includes("請重新登入")
      ) {
        router.push("/login");
        return;
      }
      return Promise.reject(new Error(response.data.message || "Unknown error"));
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
