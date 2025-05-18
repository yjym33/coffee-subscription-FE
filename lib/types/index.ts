export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface Subscription {
  id: string;
  userId: string;
  productId: string;
  frequency: string;
  status: "active" | "paused" | "cancelled";
  nextDeliveryDate: string;
}

export interface TasteProfile {
  userId: string;
  preferences: {
    roastLevel: string;
    brewMethod: string;
    flavorNotes: string[];
  };
}
