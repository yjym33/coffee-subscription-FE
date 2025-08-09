"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language-store";
import { t, Language } from "@/lib/translations";
import { Coffee, Users, Pause, Play, X } from "lucide-react";
import { SubscriptionsFilters } from "@/components/admin/subscriptions/subscriptions-filters";
import { SubscriptionsTable } from "@/components/admin/subscriptions/subscriptions-table";

// Mock subscription data
const mockSubscriptions = [
  {
    id: "SUB-001",
    customer: {
      name: "김민수",
      email: "minsu.kim@email.com",
    },
    product: "Ethiopian Yirgacheffe",
    frequency: "weekly",
    status: "active",
    nextDelivery: "2024-01-22",
    startDate: "2023-12-01",
    totalValue: 420000,
    deliveryAddress: "서울시 강남구 역삼동 123-45",
  },
  {
    id: "SUB-002",
    customer: {
      name: "이지영",
      email: "jiyoung.lee@email.com",
    },
    product: "Colombian Huila",
    frequency: "biweekly",
    status: "paused",
    nextDelivery: "2024-01-25",
    startDate: "2024-01-02",
    totalValue: 126000,
    deliveryAddress: "서울시 서초구 서초동 567-89",
  },
  {
    id: "SUB-003",
    customer: {
      name: "박철수",
      email: "cheolsu.park@email.com",
    },
    product: "Brazilian Santos",
    frequency: "monthly",
    status: "active",
    nextDelivery: "2024-02-01",
    startDate: "2023-11-20",
    totalValue: 280000,
    deliveryAddress: "부산시 해운대구 우동 789-12",
  },
  {
    id: "SUB-004",
    customer: {
      name: "최영희",
      email: "younghee.choi@email.com",
    },
    product: "Guatemalan Antigua",
    frequency: "weekly",
    status: "cancelled",
    nextDelivery: null,
    startDate: "2023-10-05",
    totalValue: 525000,
    deliveryAddress: "대구시 중구 동성로 345-67",
  },
];

function getStatusBadge(status: string, language: Language) {
  const statusConfig = {
    active: {
      variant: "default" as const,
      label: t("admin.subscriptions.status.active", language),
      icon: Play,
    },
    paused: {
      variant: "secondary" as const,
      label: t("admin.subscriptions.status.paused", language),
      icon: Pause,
    },
    cancelled: {
      variant: "destructive" as const,
      label: t("admin.subscriptions.status.cancelled", language),
      icon: X,
    },
    pending: {
      variant: "outline" as const,
      label: t("admin.subscriptions.status.pending", language),
      icon: Clock,
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}

function getFrequencyLabel(frequency: string, language: Language) {
  const frequencyLabels = {
    weekly: t("admin.subscriptions.frequency.weekly", language),
    biweekly: t("admin.subscriptions.frequency.biweekly", language),
    monthly: t("admin.subscriptions.frequency.monthly", language),
  };

  return (
    frequencyLabels[frequency as keyof typeof frequencyLabels] || frequency
  );
}

export default function AdminSubscriptions() {
  const { language } = useLanguage();
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      subscription.customer.name.includes(searchQuery) ||
      subscription.customer.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      subscription.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || subscription.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (value: string) => setSearchQuery(value);
  const handleStatusChange = (value: string) => setSelectedStatus(value);

  const statsData = {
    total: subscriptions.length,
    active: subscriptions.filter((s) => s.status === "active").length,
    paused: subscriptions.filter((s) => s.status === "paused").length,
    cancelled: subscriptions.filter((s) => s.status === "cancelled").length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("admin.subscriptions.title", language)}
            </h1>
            <p className="text-muted-foreground">
              {t("admin.subscriptions.subtitle", language)}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.subscriptions.stats.total", language)}
              </CardTitle>
              <Coffee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.subscriptions.stats.active", language)}
              </CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.subscriptions.stats.paused", language)}
              </CardTitle>
              <Pause className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.paused}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.subscriptions.stats.cancelled", language)}
              </CardTitle>
              <X className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.cancelled}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <SubscriptionsFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          language={language}
        />

        {/* Subscriptions Table */}
        <SubscriptionsTable
          subscriptions={filteredSubscriptions as any}
          language={language}
          onView={() => {}}
        />
      </div>
    </AdminLayout>
  );
}
