export type ApiCoupon = {
  id: string;
  name: string;
  code: string;
  percent: number;
  start_time: number;
  end_time: number;
  is_enabled: number;
};

export type Coupon = {
  id: string;
  name: string;
  code: string;
  percent: number;
  startTime: string;
  endTime: string;
  isEnabled: boolean;
};
