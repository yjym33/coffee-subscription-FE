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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { t, type Language } from "@/lib/translations";
import { Eye } from "lucide-react";

export interface CustomerRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: string;
  subscriptionStatus: string;
}

function getStatusBadge(status: string, language: Language) {
  const statusConfig = {
    active: {
      variant: "default" as const,
      label: t("admin.customers.status.active", language),
    },
    inactive: {
      variant: "secondary" as const,
      label: t("admin.customers.status.inactive", language),
    },
    suspended: {
      variant: "destructive" as const,
      label: t("admin.customers.status.suspended", language),
    },
  };
  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

function getSubscriptionBadge(status: string, language: Language) {
  const statusConfig = {
    active: {
      variant: "default" as const,
      label: t("admin.customers.subscription.active", language),
    },
    paused: {
      variant: "secondary" as const,
      label: t("admin.customers.subscription.paused", language),
    },
    cancelled: {
      variant: "destructive" as const,
      label: t("admin.customers.subscription.cancelled", language),
    },
  };
  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function CustomersTable({
  customers,
  language,
  onView,
}: {
  customers: CustomerRow[];
  language: Language;
  onView: (customer: CustomerRow) => void;
}) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(
      language === "ko" ? "ko-KR" : "en-US",
      { year: "numeric", month: "short", day: "numeric" }
    );
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              {t("admin.customers.table.customer", language)}
            </TableHead>
            <TableHead>
              {t("admin.customers.table.contact", language)}
            </TableHead>
            <TableHead>{t("admin.customers.table.orders", language)}</TableHead>
            <TableHead>{t("admin.customers.table.spent", language)}</TableHead>
            <TableHead>{t("admin.customers.table.status", language)}</TableHead>
            <TableHead>
              {t("admin.customers.table.subscription", language)}
            </TableHead>
            <TableHead className="text-right">
              {t("admin.customers.table.actions", language)}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/customer-${customer.id}.jpg`} />
                    <AvatarFallback>
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {t("admin.customers.joinedOn", language)}{" "}
                      {formatDate(customer.joinDate)}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">{customer.email}</div>
                  <div className="text-sm text-muted-foreground">
                    {customer.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{customer.totalOrders}</div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                ₩{customer.totalSpent.toLocaleString()}
              </TableCell>
              <TableCell>{getStatusBadge(customer.status, language)}</TableCell>
              <TableCell>
                {getSubscriptionBadge(customer.subscriptionStatus, language)}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(customer)}
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
