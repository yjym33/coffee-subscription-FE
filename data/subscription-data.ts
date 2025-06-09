export interface Subscription {
  id: string;
  planName: string;
  coffee: {
    nameKey: string;
    image: string;
  };
  frequency: "weekly" | "biweekly" | "monthly";
  price: number;
  status: "active" | "paused" | "cancelled";
  startDate: string;
  nextDelivery?: string;
  pauseUntil?: string;
  deliveriesCompleted: number;
  totalDeliveries: number;
}

export const subscriptionPlans: Subscription[] = [
  {
    id: "SUB-001",
    planName: "Premium Selection",
    coffee: {
      nameKey: "products.ethiopianYirgacheffe.name",
      image: "/images/coffee/ethiopian-yirgacheffe.jpg",
    },
    frequency: "biweekly",
    price: 24.99,
    status: "active",
    startDate: "2024-01-15",
    nextDelivery: "2024-02-15",
    deliveriesCompleted: 3,
    totalDeliveries: 12,
  },
  {
    id: "SUB-002",
    planName: "Daily Brew",
    coffee: {
      nameKey: "products.colombianSupremo.name",
      image: "/images/coffee/colombian-supremo.jpg",
    },
    frequency: "weekly",
    price: 18.99,
    status: "paused",
    startDate: "2023-11-01",
    pauseUntil: "2024-03-01",
    deliveriesCompleted: 8,
    totalDeliveries: 24,
  },
  {
    id: "SUB-003",
    planName: "Monthly Discovery",
    coffee: {
      nameKey: "products.decafSumatra.name",
      image: "/images/coffee/decaf-sumatra.jpg",
    },
    frequency: "monthly",
    price: 32.99,
    status: "cancelled",
    startDate: "2023-06-01",
    deliveriesCompleted: 6,
    totalDeliveries: 12,
  },
];

export const getSubscriptionById = (id: string): Subscription | undefined => {
  return subscriptionPlans.find((sub) => sub.id === id);
};

export const getSubscriptionsByStatus = (
  status: "active" | "paused" | "cancelled"
): Subscription[] => {
  return subscriptionPlans.filter((sub) => sub.status === status);
};

export const getActiveSubscriptions = (): Subscription[] => {
  return getSubscriptionsByStatus("active");
};

export const getPausedSubscriptions = (): Subscription[] => {
  return getSubscriptionsByStatus("paused");
};

export const getCancelledSubscriptions = (): Subscription[] => {
  return getSubscriptionsByStatus("cancelled");
};
