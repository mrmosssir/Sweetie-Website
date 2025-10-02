export type Pagination = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

// 通用的 API 回應結構
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  pagination?: Pagination;
  code?: string | number;

  // 允許其他動態的屬性，例如 products, orders 等
  [key: string]: any;
}
