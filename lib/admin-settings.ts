// Admin settings management with localStorage
export interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  currency: string;
  timezone: string;
  defaultLanguage: string;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
}

export interface ShippingSettings {
  freeShippingThreshold: number;
  domesticShippingRate: number;
  expeditedShippingRate: number;
  maxDeliveryDays: number;
  availableRegions: string[];
}

export interface PaymentSettings {
  allowedMethods: string[];
  taxRate: number;
  invoicePrefix: string;
  paymentTerms: number;
  autoInvoiceGeneration: boolean;
}

export interface NotificationSettings {
  orderConfirmation: boolean;
  shippingUpdates: boolean;
  promotionalEmails: boolean;
  lowStockAlerts: boolean;
  customerRegistration: boolean;
  systemMaintenance: boolean;
}

export interface AdminSettings {
  general: GeneralSettings;
  shipping: ShippingSettings;
  payment: PaymentSettings;
  notifications: NotificationSettings;
}

// Default settings
export const defaultSettings: AdminSettings = {
  general: {
    siteName: "Bean Bliss",
    siteDescription: "Premium Coffee Subscription Service",
    currency: "KRW",
    timezone: "Asia/Seoul",
    defaultLanguage: "ko",
    allowRegistration: true,
    requireEmailVerification: true,
  },
  shipping: {
    freeShippingThreshold: 50000,
    domesticShippingRate: 3000,
    expeditedShippingRate: 5000,
    maxDeliveryDays: 7,
    availableRegions: ["Seoul", "Busan", "Daegu", "Incheon", "Gwangju"],
  },
  payment: {
    allowedMethods: ["credit_card", "bank_transfer", "mobile_payment"],
    taxRate: 10,
    invoicePrefix: "INV-",
    paymentTerms: 30,
    autoInvoiceGeneration: true,
  },
  notifications: {
    orderConfirmation: true,
    shippingUpdates: true,
    promotionalEmails: false,
    lowStockAlerts: true,
    customerRegistration: true,
    systemMaintenance: true,
  },
};

const STORAGE_KEY = "beanbliss_admin_settings";

// Load settings from localStorage
export const loadSettings = (): AdminSettings => {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedSettings = JSON.parse(stored);
      // Merge with defaults to handle new settings
      return {
        general: { ...defaultSettings.general, ...parsedSettings.general },
        shipping: { ...defaultSettings.shipping, ...parsedSettings.shipping },
        payment: { ...defaultSettings.payment, ...parsedSettings.payment },
        notifications: { ...defaultSettings.notifications, ...parsedSettings.notifications },
      };
    }
  } catch (error) {
    console.error('Failed to load admin settings:', error);
  }
  
  return defaultSettings;
};

// Save settings to localStorage
export const saveSettings = (settings: AdminSettings): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Failed to save admin settings:', error);
    return false;
  }
};

// Reset settings to default
export const resetSettings = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to reset admin settings:', error);
    return false;
  }
};

// Export settings as JSON
export const exportSettings = (settings: AdminSettings): string => {
  return JSON.stringify(settings, null, 2);
};

// Import settings from JSON string
export const importSettings = (jsonString: string): AdminSettings | null => {
  try {
    const parsed = JSON.parse(jsonString);
    
    // Basic validation
    if (!parsed.general || !parsed.shipping || !parsed.payment || !parsed.notifications) {
      throw new Error('Invalid settings format');
    }

    return {
      general: { ...defaultSettings.general, ...parsed.general },
      shipping: { ...defaultSettings.shipping, ...parsed.shipping },
      payment: { ...defaultSettings.payment, ...parsed.payment },
      notifications: { ...defaultSettings.notifications, ...parsed.notifications },
    };
  } catch (error) {
    console.error('Failed to import settings:', error);
    return null;
  }
};