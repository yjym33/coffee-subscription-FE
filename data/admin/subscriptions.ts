export const mockSubscriptions = [
  {
    id: "SUB-001",
    customer: {
      name: "김민수",
      email: "minsu.kim@email.com",
    },
    product: "Ethiopian Yirgacheffe",
    frequency: "weekly",
    status: "active",
    nextDelivery: "2024-01-22",
    startDate: "2023-12-01",
    totalValue: 420000,
    deliveryAddress: "서울시 강남구 역삼동 123-45",
  },
  {
    id: "SUB-002",
    customer: {
      name: "이지영",
      email: "jiyoung.lee@email.com",
    },
    product: "Colombian Huila",
    frequency: "biweekly",
    status: "paused",
    nextDelivery: "2024-01-25",
    startDate: "2024-01-02",
    totalValue: 126000,
    deliveryAddress: "서울시 서초구 서초동 567-89",
  },
  {
    id: "SUB-003",
    customer: {
      name: "박철수",
      email: "cheolsu.park@email.com",
    },
    product: "Brazilian Santos",
    frequency: "monthly",
    status: "active",
    nextDelivery: "2024-02-01",
    startDate: "2023-11-20",
    totalValue: 280000,
    deliveryAddress: "부산시 해운대구 우동 789-12",
  },
  {
    id: "SUB-004",
    customer: {
      name: "최영희",
      email: "younghee.choi@email.com",
    },
    product: "Guatemalan Antigua",
    frequency: "weekly",
    status: "cancelled",
    nextDelivery: null,
    startDate: "2023-10-05",
    totalValue: 525000,
    deliveryAddress: "대구시 중구 동성로 345-67",
  },
] as const;



