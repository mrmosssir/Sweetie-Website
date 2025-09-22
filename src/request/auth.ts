import request from "@/request/core";

export const checkAuth = () => {
  return request.post("/user/check");
};
