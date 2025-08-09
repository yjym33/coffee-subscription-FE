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
import { Calendar, Eye } from "lucide-react";

export interface SubscriptionRow {
  id: string;
  customer: { name: string; email: string };
  product: string;
  frequency: string;
  status: string;
  nextDelivery: string | null;
  startDate: string;
  totalValue: number;
}

function getStatusBadge(status: string, language: Language) {
  const statusConfig = {
    active: {
      variant: "default" as const,
      label: t("admin.subscriptions.status.active", language),
    },
    paused: {
      variant: "secondary" as const,
      label: t("admin.subscriptions.status.paused", language),
    },
    cancelled: {
      variant: "destructive" as const,
      label: t("admin.subscriptions.status.cancelled", language),
    },
    pending: {
      variant: "outline" as const,
      label: t("admin.subscriptions.status.pending", language),
    },
  };
  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

function getFrequencyLabel(frequency: string, language: Language) {
  const labels = {
    weekly: t("admin.subscriptions.frequency.weekly", language),
    biweekly: t("admin.subscriptions.frequency.biweekly", language),
    monthly: t("admin.subscriptions.frequency.monthly", language),
  };
  return labels[frequency as keyof typeof labels] || frequency;
}

export function SubscriptionsTable({
  subscriptions,
  language,
  onView,
}: {
  subscriptions: SubscriptionRow[];
  language: Language;
  onView: (subscription: SubscriptionRow) => void;
}) {
  const formatDate = (dateString: string | null) =>
    dateString
      ? new Date(dateString).toLocaleDateString(
          language === "ko" ? "ko-KR" : "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )
      : "-";

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              {t("admin.subscriptions.table.customer", language)}
            </TableHead>
            <TableHead>
              {t("admin.subscriptions.table.product", language)}
            </TableHead>
            <TableHead>
              {t("admin.subscriptions.table.frequency", language)}
            </TableHead>
            <TableHead>
              {t("admin.subscriptions.table.nextDelivery", language)}
            </TableHead>
            <TableHead>
              {t("admin.subscriptions.table.status", language)}
            </TableHead>
            <TableHead>
              {t("admin.subscriptions.table.totalValue", language)}
            </TableHead>
            <TableHead className="text-right">
              {t("admin.subscriptions.table.actions", language)}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription) => (
            <TableRow key={subscription.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-medium">
                      {subscription.customer.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {subscription.id}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{subscription.product}</div>
                <div className="text-sm text-muted-foreground">
                  Started: {formatDate(subscription.startDate)}
                </div>
              </TableCell>
              <TableCell>
                {getFrequencyLabel(subscription.frequency, language)}
              </TableCell>
              <TableCell>
                {subscription.nextDelivery ? (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(subscription.nextDelivery)}
                  </div>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                {getStatusBadge(subscription.status, language)}
              </TableCell>
              <TableCell className="font-medium">
                ₩{subscription.totalValue.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(subscription)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
