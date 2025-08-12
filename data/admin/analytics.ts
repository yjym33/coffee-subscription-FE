export const analyticsData = {
  revenue: {
    total: 12450000,
    monthlyGrowth: 15.2,
    averageOrderValue: 42500,
    monthlyData: [
      { month: "Jan", value: 8500000 },
      { month: "Feb", value: 9200000 },
      { month: "Mar", value: 10100000 },
      { month: "Apr", value: 9800000 },
      { month: "May", value: 11200000 },
      { month: "Jun", value: 12450000 },
    ],
  },
  customers: {
    total: 1234,
    newCustomers: 89,
    retention: 78.5,
    lifetimeValue: 285000,
    segments: {
      new: 15,
      returning: 65,
      vip: 20,
    },
  },
  products: {
    totalProducts: 87,
    topProducts: [
      { name: "Ethiopian Yirgacheffe", sales: 245, revenue: 8575000 },
      { name: "Colombian Huila", sales: 198, revenue: 8316000 },
      { name: "Brazilian Santos", sales: 167, revenue: 6346000 },
      { name: "Guatemalan Antigua", sales: 134, revenue: 6030000 },
    ],
    lowStock: [
      { name: "Brazilian Santos", stock: 3, threshold: 10 },
      { name: "Costa Rican Tarrazú", stock: 7, threshold: 15 },
    ],
    profitMargin: 42.8,
  },
  subscriptions: {
    active: 456,
    churnRate: 5.2,
    averageLifetime: 18.5,
    frequencyDistribution: {
      weekly: 35,
      biweekly: 45,
      monthly: 20,
    },
  },
} as const;



