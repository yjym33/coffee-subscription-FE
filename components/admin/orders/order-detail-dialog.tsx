"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t, type Language } from "@/lib/translations";
import { Mail, Phone, MapPin } from "lucide-react";

export interface OrderDetail {
  id: string;
  customer: { name: string; email: string; phone: string; address: string };
  items: { name: string; nameKo: string; quantity: number; price: number }[];
  total: number;
  date: string;
  shippingDate: string | null;
  trackingNumber: string | null;
}

export function OrderDetailDialog({
  open,
  onOpenChange,
  order,
  language,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderDetail | null;
  language: Language;
}) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(
      language === "ko" ? "ko-KR" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {t("admin.orders.orderDetails", language)}{" "}
            {order ? `- ${order.id}` : ""}
          </DialogTitle>
          <DialogDescription>
            {order ? formatDate(order.date) : null}
          </DialogDescription>
        </DialogHeader>

        {order && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("admin.orders.customerInfo", language)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customer.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("admin.orders.orderItems", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 border rounded"
                    >
                      <div>
                        <div className="font-medium">
                          {language === "ko" ? item.nameKo : item.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {t("admin.orders.quantity", language)}:{" "}
                          {item.quantity}
                        </div>
                      </div>
                      <div className="font-medium">
                        ₩{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between items-center font-bold">
                    <span>{t("admin.orders.total", language)}</span>
                    <span>₩{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {order.trackingNumber ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t("admin.orders.shippingInfo", language)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">
                        {t("admin.orders.trackingNumber", language)}:{" "}
                      </span>
                      <span>{order.trackingNumber}</span>
                    </div>
                    {order.shippingDate ? (
                      <div>
                        <span className="font-medium">
                          {t("admin.orders.shippingDate", language)}:{" "}
                        </span>
                        <span>{formatDate(order.shippingDate)}</span>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
