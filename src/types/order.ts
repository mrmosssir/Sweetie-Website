export type ApiOrder = {
  id: string;
  name: string;
  mail: string;
  note: string;
  total_price: number;
  is_paid: boolean;
  is_enabled: boolean;
  paid_at: string;
  picked_at: string;
  products: OrderProduct[];
};

export type Order = {
  id: string;
  name: string;
  mail: string;
  note: string;
  totalPrice: number;
  isPaid: boolean;
  isEnabled: boolean;
  paidAt: string;
  pickedAt: string;
  products: OrderProduct[];
};

export type OrderProduct = {
  name: string;
  count: number;
};
