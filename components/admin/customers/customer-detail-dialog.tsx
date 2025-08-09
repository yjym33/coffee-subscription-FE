"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { t, type Language } from "@/lib/translations";

export interface CustomerDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  preferences: { acidity: number; body: number; caffeine: number };
}

export function CustomerDetailDialog({
  open,
  onOpenChange,
  customer,
  language,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: CustomerDetail | null;
  language: Language;
}) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(
      language === "ko" ? "ko-KR" : "en-US",
      { year: "numeric", month: "short", day: "numeric" }
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {t("admin.customers.customerDetails", language)}{" "}
            {customer ? `- ${customer.name}` : ""}
          </DialogTitle>
          <DialogDescription>
            {customer
              ? `${t("admin.customers.joinedOn", language)} ${formatDate(
                  customer.joinDate
                )}`
              : null}
          </DialogDescription>
        </DialogHeader>

        {customer && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("admin.customers.contactInfo", language)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("admin.customers.orderStats", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">
                      {customer.totalOrders}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("admin.customers.totalOrders", language)}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      ₩{customer.totalSpent.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("admin.customers.totalSpent", language)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("admin.customers.tastePreferences", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["acidity", "body", "caffeine"].map((key) => (
                    <div
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <span>{t(`admin.customers.${key}`, language)}</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-3 h-3 rounded-full ${
                              level <= (customer.preferences as any)[key]
                                ? "bg-amber-500"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
