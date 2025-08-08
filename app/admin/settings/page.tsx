"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/hooks/use-language-store";
import { t } from "@/lib/translations";
import {
  Settings,
  Globe,
  Truck,
  CreditCard,
  Bell,
  Save,
  MapPin,
  DollarSign,
  Clock,
  Mail,
} from "lucide-react";

// Mock settings data
const generalSettings = {
  siteName: "Bean Bliss",
  siteDescription: "Premium Coffee Subscription Service",
  currency: "KRW",
  timezone: "Asia/Seoul",
  defaultLanguage: "ko",
  allowRegistration: true,
  requireEmailVerification: true,
};

const shippingSettings = {
  freeShippingThreshold: 50000,
  domesticShippingRate: 3000,
  expeditedShippingRate: 5000,
  maxDeliveryDays: 7,
  availableRegions: ["Seoul", "Busan", "Daegu", "Incheon", "Gwangju"],
};

const paymentSettings = {
  allowedMethods: ["credit_card", "bank_transfer", "mobile_payment"],
  taxRate: 10,
  invoicePrefix: "INV-",
  paymentTerms: 30,
  autoInvoiceGeneration: true,
};

const notificationSettings = {
  orderConfirmation: true,
  shippingUpdates: true,
  promotionalEmails: false,
  lowStockAlerts: true,
  customerRegistration: true,
  systemMaintenance: true,
};

export default function AdminSettings() {
  const { language } = useLanguage();
  const [general, setGeneral] = useState(generalSettings);
  const [shipping, setShipping] = useState(shippingSettings);
  const [payment, setPayment] = useState(paymentSettings);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message or handle error
  };

  const updateGeneral = (key: string, value: any) => {
    setGeneral(prev => ({ ...prev, [key]: value }));
  };

  const updateShipping = (key: string, value: any) => {
    setShipping(prev => ({ ...prev, [key]: value }));
  };

  const updatePayment = (key: string, value: any) => {
    setPayment(prev => ({ ...prev, [key]: value }));
  };

  const updateNotifications = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("admin.settings.title", language)}
            </h1>
            <p className="text-muted-foreground">
              {t("admin.settings.subtitle", language)}
            </p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {t("admin.common.save", language)}
              </>
            )}
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">
              <Globe className="mr-2 h-4 w-4" />
              {t("admin.settings.general.title", language)}
            </TabsTrigger>
            <TabsTrigger value="shipping">
              <Truck className="mr-2 h-4 w-4" />
              {t("admin.settings.shipping.title", language)}
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className="mr-2 h-4 w-4" />
              {t("admin.settings.payments.title", language)}
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              {t("admin.settings.notifications.title", language)}
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("admin.settings.general.title", language)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">
                      {t("admin.settings.general.siteName", language)}
                    </Label>
                    <Input
                      id="siteName"
                      value={general.siteName}
                      onChange={(e) => updateGeneral("siteName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">
                      {t("admin.settings.general.currency", language)}
                    </Label>
                    <Select
                      value={general.currency}
                      onValueChange={(value) => updateGeneral("currency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KRW">KRW (₩)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">
                    {t("admin.settings.general.siteDescription", language)}
                  </Label>
                  <Textarea
                    id="siteDescription"
                    value={general.siteDescription}
                    onChange={(e) => updateGeneral("siteDescription", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">
                      {t("admin.settings.general.timezone", language)}
                    </Label>
                    <Select
                      value={general.timezone}
                      onValueChange={(value) => updateGeneral("timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Seoul">Seoul (UTC+9)</SelectItem>
                        <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
                        <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                        <SelectItem value="Europe/London">London (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">
                      {t("admin.settings.general.language", language)}
                    </Label>
                    <Select
                      value={general.defaultLanguage}
                      onValueChange={(value) => updateGeneral("defaultLanguage", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ko">한국어</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow New User Registration</Label>
                      <div className="text-sm text-muted-foreground">
                        Enable new users to create accounts
                      </div>
                    </div>
                    <Switch
                      checked={general.allowRegistration}
                      onCheckedChange={(checked) =>
                        updateGeneral("allowRegistration", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Email Verification</Label>
                      <div className="text-sm text-muted-foreground">
                        Users must verify their email before accessing the account
                      </div>
                    </div>
                    <Switch
                      checked={general.requireEmailVerification}
                      onCheckedChange={(checked) =>
                        updateGeneral("requireEmailVerification", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("admin.settings.shipping.title", language)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="freeShippingThreshold" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {t("admin.settings.shipping.freeShippingThreshold", language)}
                    </Label>
                    <Input
                      id="freeShippingThreshold"
                      type="number"
                      value={shipping.freeShippingThreshold}
                      onChange={(e) =>
                        updateShipping("freeShippingThreshold", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxDeliveryDays" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Maximum Delivery Days
                    </Label>
                    <Input
                      id="maxDeliveryDays"
                      type="number"
                      value={shipping.maxDeliveryDays}
                      onChange={(e) =>
                        updateShipping("maxDeliveryDays", parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    {t("admin.settings.shipping.shippingRates", language)}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="domesticShippingRate">
                        Domestic Shipping Rate
                      </Label>
                      <Input
                        id="domesticShippingRate"
                        type="number"
                        value={shipping.domesticShippingRate}
                        onChange={(e) =>
                          updateShipping("domesticShippingRate", parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expeditedShippingRate">
                        Expedited Shipping Rate
                      </Label>
                      <Input
                        id="expeditedShippingRate"
                        type="number"
                        value={shipping.expeditedShippingRate}
                        onChange={(e) =>
                          updateShipping("expeditedShippingRate", parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    {t("admin.settings.shipping.deliveryAreas", language)}
                  </h3>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Available Regions
                    </Label>
                    <div className="text-sm text-muted-foreground">
                      Currently serving: {shipping.availableRegions.join(", ")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("admin.settings.payments.title", language)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    {t("admin.settings.payments.paymentMethods", language)}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="credit_card"
                        checked={payment.allowedMethods.includes("credit_card")}
                        onChange={(e) => {
                          const methods = e.target.checked
                            ? [...payment.allowedMethods, "credit_card"]
                            : payment.allowedMethods.filter(m => m !== "credit_card");
                          updatePayment("allowedMethods", methods);
                        }}
                      />
                      <Label htmlFor="credit_card">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="bank_transfer"
                        checked={payment.allowedMethods.includes("bank_transfer")}
                        onChange={(e) => {
                          const methods = e.target.checked
                            ? [...payment.allowedMethods, "bank_transfer"]
                            : payment.allowedMethods.filter(m => m !== "bank_transfer");
                          updatePayment("allowedMethods", methods);
                        }}
                      />
                      <Label htmlFor="bank_transfer">Bank Transfer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="mobile_payment"
                        checked={payment.allowedMethods.includes("mobile_payment")}
                        onChange={(e) => {
                          const methods = e.target.checked
                            ? [...payment.allowedMethods, "mobile_payment"]
                            : payment.allowedMethods.filter(m => m !== "mobile_payment");
                          updatePayment("allowedMethods", methods);
                        }}
                      />
                      <Label htmlFor="mobile_payment">Mobile Payment</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">
                      {t("admin.settings.payments.taxSettings", language)} (%)
                    </Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={payment.taxRate}
                      onChange={(e) =>
                        updatePayment("taxRate", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms (days)</Label>
                    <Input
                      id="paymentTerms"
                      type="number"
                      value={payment.paymentTerms}
                      onChange={(e) =>
                        updatePayment("paymentTerms", parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                  <Input
                    id="invoicePrefix"
                    value={payment.invoicePrefix}
                    onChange={(e) => updatePayment("invoicePrefix", e.target.value)}
                    className="max-w-xs"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Invoice Generation</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically generate invoices for new orders
                    </div>
                  </div>
                  <Switch
                    checked={payment.autoInvoiceGeneration}
                    onCheckedChange={(checked) =>
                      updatePayment("autoInvoiceGeneration", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("admin.settings.notifications.title", language)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    {t("admin.settings.notifications.orderNotifications", language)}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Order Confirmation</Label>
                        <div className="text-sm text-muted-foreground">
                          Send confirmation emails when orders are placed
                        </div>
                      </div>
                      <Switch
                        checked={notifications.orderConfirmation}
                        onCheckedChange={(checked) =>
                          updateNotifications("orderConfirmation", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Shipping Updates</Label>
                        <div className="text-sm text-muted-foreground">
                          Notify customers about shipping status changes
                        </div>
                      </div>
                      <Switch
                        checked={notifications.shippingUpdates}
                        onCheckedChange={(checked) =>
                          updateNotifications("shippingUpdates", checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    {t("admin.settings.notifications.customerNotifications", language)}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Customer Registration</Label>
                        <div className="text-sm text-muted-foreground">
                          Notify admins when new customers register
                        </div>
                      </div>
                      <Switch
                        checked={notifications.customerRegistration}
                        onCheckedChange={(checked) =>
                          updateNotifications("customerRegistration", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Promotional Emails</Label>
                        <div className="text-sm text-muted-foreground">
                          Allow sending promotional and marketing emails
                        </div>
                      </div>
                      <Switch
                        checked={notifications.promotionalEmails}
                        onCheckedChange={(checked) =>
                          updateNotifications("promotionalEmails", checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    {t("admin.settings.notifications.systemAlerts", language)}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Low Stock Alerts</Label>
                        <div className="text-sm text-muted-foreground">
                          Alert when product inventory is running low
                        </div>
                      </div>
                      <Switch
                        checked={notifications.lowStockAlerts}
                        onCheckedChange={(checked) =>
                          updateNotifications("lowStockAlerts", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Maintenance</Label>
                        <div className="text-sm text-muted-foreground">
                          Notify about scheduled maintenance and updates
                        </div>
                      </div>
                      <Switch
                        checked={notifications.systemMaintenance}
                        onCheckedChange={(checked) =>
                          updateNotifications("systemMaintenance", checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}