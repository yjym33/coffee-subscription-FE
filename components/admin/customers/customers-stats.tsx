"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Calendar } from "lucide-react";
import { t, type Language } from "@/lib/translations";

export interface CustomerItem {
  id: string;
  status: string;
  subscriptionStatus: string;
}

export function CustomersStats({
  customers,
  language,
}: {
  customers: CustomerItem[];
  language: Language;
}) {
  const total = customers.length;
  const active = customers.filter((c) => c.status === "active").length;
  const inactive = customers.filter((c) => c.status === "inactive").length;
  const subscribed = customers.filter(
    (c) => c.subscriptionStatus === "active"
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("admin.customers.stats.total", language)}
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("admin.customers.stats.active", language)}
          </CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{active}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("admin.customers.stats.subscribed", language)}
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{subscribed}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("admin.customers.stats.inactive", language)}
          </CardTitle>
          <UserX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inactive}</div>
        </CardContent>
      </Card>
    </div>
  );
}
