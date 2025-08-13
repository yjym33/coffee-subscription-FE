export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: { name: string; nameKo: string; quantity: number; price: number }[];
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  date: string;
  shippingDate: string | null;
  trackingNumber: string | null;
}

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: {
      name: "김민수",
      email: "minsu.kim@email.com",
      phone: "010-1234-5678",
      address: "서울시 강남구 역삼동 123-45",
    },
    items: [
      {
        name: "Ethiopian Yirgacheffe",
        nameKo: "에티오피아 예가체프",
        quantity: 2,
        price: 35000,
      },
    ],
    total: 70000,
    status: "completed",
    paymentStatus: "paid",
    date: "2024-01-15T10:30:00",
    shippingDate: "2024-01-16T09:00:00",
    trackingNumber: "KR123456789",
  },
  {
    id: "ORD-002",
    customer: {
      name: "이지영",
      email: "jiyoung.lee@email.com",
      phone: "010-2345-6789",
      address: "서울시 서초구 서초동 567-89",
    },
    items: [
      {
        name: "Colombian Huila",
        nameKo: "콜롬비아 우일라",
        quantity: 1,
        price: 42000,
      },
    ],
    total: 42000,
    status: "processing",
    paymentStatus: "paid",
    date: "2024-01-15T14:20:00",
    shippingDate: null,
    trackingNumber: null,
  },
  {
    id: "ORD-003",
    customer: {
      name: "박철수",
      email: "cheolsu.park@email.com",
      phone: "010-3456-7890",
      address: "부산시 해운대구 우동 789-12",
    },
    items: [
      {
        name: "Brazilian Santos",
        nameKo: "브라질 산토스",
        quantity: 1,
        price: 38000,
      },
      {
        name: "House Blend",
        nameKo: "하우스 블렌드",
        quantity: 1,
        price: 32000,
      },
    ],
    total: 70000,
    status: "shipped",
    paymentStatus: "paid",
    date: "2024-01-14T16:45:00",
    shippingDate: "2024-01-15T11:00:00",
    trackingNumber: "KR987654321",
  },
  {
    id: "ORD-004",
    customer: {
      name: "최영희",
      email: "younghee.choi@email.com",
      phone: "010-4567-8901",
      address: "대구시 중구 동성로 345-67",
    },
    items: [
      {
        name: "Guatemalan Antigua",
        nameKo: "과테말라 안티구아",
        quantity: 3,
        price: 45000,
      },
    ],
    total: 135000,
    status: "cancelled",
    paymentStatus: "refunded",
    date: "2024-01-14T09:15:00",
    shippingDate: null,
    trackingNumber: null,
  },
];
