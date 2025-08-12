export const notifications = [
  {
    id: "NOT-001",
    type: "order",
    title: "New Order Received",
    message: "Order #ORD-12345 has been placed by 김민수",
    timestamp: "2024-01-15T14:30:00Z",
    read: false,
    priority: "normal",
  },
  {
    id: "NOT-002",
    type: "inventory",
    title: "Low Stock Alert",
    message: "Brazilian Santos is running low (3 units remaining)",
    timestamp: "2024-01-15T13:45:00Z",
    read: false,
    priority: "high",
  },
  {
    id: "NOT-003",
    type: "customer",
    title: "New Customer Registration",
    message: "이지영 has registered as a new customer",
    timestamp: "2024-01-15T12:20:00Z",
    read: true,
    priority: "normal",
  },
  {
    id: "NOT-004",
    type: "system",
    title: "System Maintenance Scheduled",
    message: "Scheduled maintenance on 2024-01-20 at 02:00 AM",
    timestamp: "2024-01-15T10:00:00Z",
    read: true,
    priority: "low",
  },
  {
    id: "NOT-005",
    type: "order",
    title: "Order Shipped",
    message: "Order #ORD-12344 has been shipped to 박철수",
    timestamp: "2024-01-15T09:15:00Z",
    read: true,
    priority: "normal",
  },
  {
    id: "NOT-006",
    type: "inventory",
    title: "Stock Replenished",
    message: "Ethiopian Yirgacheffe inventory has been updated (+50 units)",
    timestamp: "2024-01-15T08:30:00Z",
    read: true,
    priority: "normal",
  },
] as const;

export const notificationSettings = {
  email: {
    orders: true,
    customers: true,
    inventory: true,
    system: false,
  },
  push: {
    orders: true,
    customers: false,
    inventory: true,
    system: true,
  },
  sms: {
    orders: false,
    customers: false,
    inventory: true,
    system: false,
  },
} as const;



