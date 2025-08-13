"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { t, type Language } from "@/lib/translations";
import type { OrderStatus, PaymentStatus } from "@/data/admin/orders";
import { Eye, Truck, Package, CheckCircle, XCircle, Clock } from "lucide-react";

export interface OrderRow {
  id: string;
  customer: { name: string; email: string };
  items: { name: string; nameKo: string; quantity: number; price: number }[];
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  date: string;
}

function getStatusBadge(status: string, language: Language) {
  const statusConfig = {
    pending: {
      variant: "secondary" as const,
      label: t("admin.orders.status.pending", language),
      icon: Clock,
    },
    processing: {
      variant: "default" as const,
      label: t("admin.orders.status.processing", language),
      icon: Package,
    },
    shipped: {
      variant: "outline" as const,
      label: t("admin.orders.status.shipped", language),
      icon: Truck,
    },
    completed: {
      variant: "default" as const,
      label: t("admin.orders.status.completed", language),
      icon: CheckCircle,
    },
    cancelled: {
      variant: "destructive" as const,
      label: t("admin.orders.status.cancelled", language),
      icon: XCircle,
    },
  };
  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;
  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}

function getPaymentStatusBadge(status: string, language: Language) {
  const statusConfig = {
    pending: {
      variant: "secondary" as const,
      label: t("admin.orders.payment.pending", language),
    },
    paid: {
      variant: "default" as const,
      label: t("admin.orders.payment.paid", language),
    },
    refunded: {
      variant: "destructive" as const,
      label: t("admin.orders.payment.refunded", language),
    },
    failed: {
      variant: "destructive" as const,
      label: t("admin.orders.payment.failed", language),
    },
  };
  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function OrdersTable({
  orders,
  language,
  onView,
  onStatusChange,
}: {
  orders: OrderRow[];
  language: Language;
  onView: (order: OrderRow) => void;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
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
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("admin.orders.table.order", language)}</TableHead>
            <TableHead>{t("admin.orders.table.customer", language)}</TableHead>
            <TableHead>{t("admin.orders.table.items", language)}</TableHead>
            <TableHead>{t("admin.orders.table.total", language)}</TableHead>
            <TableHead>{t("admin.orders.table.status", language)}</TableHead>
            <TableHead>{t("admin.orders.table.payment", language)}</TableHead>
            <TableHead className="text-right">
              {t("admin.orders.table.actions", language)}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{order.id}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(order.date)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.customer.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {order.items.length}{" "}
                  {t("admin.orders.table.itemCount", language)}
                </div>
              </TableCell>
              <TableCell className="font-medium">
                ₩{order.total.toLocaleString()}
              </TableCell>
              <TableCell>{getStatusBadge(order.status, language)}</TableCell>
              <TableCell>
                {getPaymentStatusBadge(order.paymentStatus, language)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(order)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      onStatusChange(order.id, e.target.value as OrderStatus)
                    }
                    className="w-[120px] h-8 rounded-md border border-input bg-background px-2 text-sm"
                  >
                    {[
                      "pending",
                      "processing",
                      "shipped",
                      "completed",
                      "cancelled",
                    ].map((s) => (
                      <option key={s} value={s}>
                        {t(`admin.orders.status.${s}`, language)}
                      </option>
                    ))}
                  </select>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
