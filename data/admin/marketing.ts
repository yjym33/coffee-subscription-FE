export const campaigns = [
  {
    id: "CAM-001",
    name: "New Year Coffee Special",
    type: "email",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    recipients: 1234,
    opens: 856,
    clicks: 234,
    conversions: 45,
    revenue: 1890000,
  },
  {
    id: "CAM-002",
    name: "Ethiopian Coffee Launch",
    type: "email",
    status: "completed",
    startDate: "2023-12-15",
    endDate: "2024-01-15",
    recipients: 987,
    opens: 678,
    clicks: 189,
    conversions: 32,
    revenue: 1344000,
  },
  {
    id: "CAM-003",
    name: "Valentine's Day Bundle",
    type: "promotion",
    status: "draft",
    startDate: "2024-02-01",
    endDate: "2024-02-14",
    recipients: 0,
    opens: 0,
    clicks: 0,
    conversions: 0,
    revenue: 0,
  },
] as const;

export const emailTemplates = [
  {
    id: "TPL-001",
    name: "Welcome Series - Part 1",
    category: "welcome",
    lastUsed: "2024-01-14",
    usage: 234,
  },
  {
    id: "TPL-002",
    name: "Monthly Newsletter",
    category: "newsletter",
    lastUsed: "2024-01-10",
    usage: 1456,
  },
  {
    id: "TPL-003",
    name: "Subscription Reminder",
    category: "reminder",
    lastUsed: "2024-01-12",
    usage: 567,
  },
  {
    id: "TPL-004",
    name: "Product Launch",
    category: "promotion",
    lastUsed: "2023-12-28",
    usage: 89,
  },
] as const;

export const coupons = [
  {
    id: "CPN-001",
    code: "NEWUSER20",
    discount: "20%",
    type: "percentage",
    status: "active",
    usageCount: 145,
    usageLimit: 500,
    expiryDate: "2024-03-31",
  },
  {
    id: "CPN-002",
    code: "SAVE5000",
    discount: "₩5,000",
    type: "fixed",
    status: "active",
    usageCount: 78,
    usageLimit: 200,
    expiryDate: "2024-02-29",
  },
  {
    id: "CPN-003",
    code: "EXPIRED10",
    discount: "10%",
    type: "percentage",
    status: "expired",
    usageCount: 234,
    usageLimit: 300,
    expiryDate: "2024-01-15",
  },
] as const;



