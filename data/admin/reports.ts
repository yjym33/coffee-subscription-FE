export const availableReports = [
  {
    id: "sales",
    name: "admin.reports.types.sales",
    icon: "TrendingUp",
    description: "Revenue, orders, and sales performance metrics",
    lastGenerated: "2024-01-15",
    size: "2.4 MB",
  },
  {
    id: "customers",
    name: "admin.reports.types.customers",
    icon: "Users",
    description: "Customer demographics, retention, and lifetime value",
    lastGenerated: "2024-01-14",
    size: "1.8 MB",
  },
  {
    id: "products",
    name: "admin.reports.types.products",
    icon: "Package",
    description: "Product performance, inventory, and profitability",
    lastGenerated: "2024-01-13",
    size: "3.1 MB",
  },
  {
    id: "subscriptions",
    name: "admin.reports.types.subscriptions",
    icon: "Coffee",
    description: "Subscription metrics, churn rates, and frequency analysis",
    lastGenerated: "2024-01-12",
    size: "1.5 MB",
  },
  {
    id: "inventory",
    name: "admin.reports.types.inventory",
    icon: "BarChart3",
    description: "Stock levels, turnover rates, and supply chain metrics",
    lastGenerated: "2024-01-11",
    size: "0.9 MB",
  },
] as const;

export const recentReports = [
  {
    id: "RPT-001",
    type: "Sales Report",
    dateRange: "2024-01-01 to 2024-01-15",
    generatedAt: "2024-01-15 14:30",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "RPT-002",
    type: "Customer Report",
    dateRange: "2023-12-01 to 2023-12-31",
    generatedAt: "2024-01-14 09:15",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "RPT-003",
    type: "Product Performance",
    dateRange: "2024-01-01 to 2024-01-10",
    generatedAt: "2024-01-13 16:45",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "RPT-004",
    type: "Subscription Analysis",
    dateRange: "2023-11-01 to 2023-12-31",
    generatedAt: "2024-01-12 11:20",
    status: "processing",
    downloadUrl: null,
  },
] as const;



