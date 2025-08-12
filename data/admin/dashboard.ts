export const dashboardStats = {
  revenue: {
    total: "₩2,450,000",
    change: "+12.5%",
    trend: "up",
  },
  customers: {
    total: "1,234",
    change: "+5.2%",
    trend: "up",
  },
  products: {
    total: "87",
    change: "+2",
    trend: "up",
  },
  orders: {
    total: "156",
    change: "-3.1%",
    trend: "down",
  },
} as const;

export const recentOrders = [
  {
    id: "ORD-001",
    customer: "김민수",
    product: "Ethiopian Yirgacheffe",
    amount: "₩35,000",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "이지영",
    product: "Colombian Huila",
    amount: "₩42,000",
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "박철수",
    product: "Brazilian Santos",
    amount: "₩38,000",
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "ORD-004",
    customer: "최영희",
    product: "Guatemalan Antigua",
    amount: "₩45,000",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "ORD-005",
    customer: "정대현",
    product: "Costa Rican Tarrazú",
    amount: "₩40,000",
    status: "processing",
    date: "2024-01-13",
  },
] as const;

export const topProducts = [
  {
    name: "Ethiopian Yirgacheffe",
    sales: 45,
    revenue: "₩1,575,000",
  },
  {
    name: "Colombian Huila",
    sales: 38,
    revenue: "₩1,596,000",
  },
  {
    name: "Brazilian Santos",
    sales: 32,
    revenue: "₩1,216,000",
  },
  {
    name: "Guatemalan Antigua",
    sales: 28,
    revenue: "₩1,260,000",
  },
] as const;



