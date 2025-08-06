"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/use-language-store";
import { t, Language } from "@/lib/translations";
import {
  DollarSign,
  Users,
  Package,
  TrendingUp,
  ShoppingCart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";

// Mock data for dashboard
const dashboardStats = {
  revenue: {
    total: "₩2,450,000",
    change: "+12.5%",
    trend: "up",
  },
  customers: {
    total: "1,234",
    change: "+5.2%",
    trend: "up",
  },
  products: {
    total: "87",
    change: "+2",
    trend: "up",
  },
  orders: {
    total: "156",
    change: "-3.1%",
    trend: "down",
  },
};

const recentOrders = [
  {
    id: "ORD-001",
    customer: "김민수",
    product: "Ethiopian Yirgacheffe",
    amount: "₩35,000",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "이지영",
    product: "Colombian Huila",
    amount: "₩42,000",
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "박철수",
    product: "Brazilian Santos",
    amount: "₩38,000",
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "ORD-004",
    customer: "최영희",
    product: "Guatemalan Antigua",
    amount: "₩45,000",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "ORD-005",
    customer: "정대현",
    product: "Costa Rican Tarrazú",
    amount: "₩40,000",
    status: "processing",
    date: "2024-01-13",
  },
];

const topProducts = [
  {
    name: "Ethiopian Yirgacheffe",
    sales: 45,
    revenue: "₩1,575,000",
  },
  {
    name: "Colombian Huila",
    sales: 38,
    revenue: "₩1,596,000",
  },
  {
    name: "Brazilian Santos",
    sales: 32,
    revenue: "₩1,216,000",
  },
  {
    name: "Guatemalan Antigua",
    sales: 28,
    revenue: "₩1,260,000",
  },
];

function getStatusBadge(status: string, language: Language) {
  const statusConfig = {
    completed: {
      variant: "default" as const,
      label: t("admin.orders.status.completed", language),
    },
    processing: {
      variant: "secondary" as const,
      label: t("admin.orders.status.processing", language),
    },
    shipped: {
      variant: "outline" as const,
      label: t("admin.orders.status.shipped", language),
    },
    cancelled: {
      variant: "destructive" as const,
      label: t("admin.orders.status.cancelled", language),
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] ||
    statusConfig.processing;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export default function AdminDashboard() {
  const { language } = useLanguage();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("admin.dashboard.title", language)}
            </h1>
            <p className="text-muted-foreground">
              {t("admin.dashboard.subtitle", language)}
            </p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            {t("admin.dashboard.viewReports", language)}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.dashboard.stats.revenue", language)}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.revenue.total}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                {dashboardStats.revenue.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    dashboardStats.revenue.trend === "up"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {dashboardStats.revenue.change}
                </span>
                <span className="ml-1">
                  {t("admin.dashboard.stats.fromLastMonth", language)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.dashboard.stats.customers", language)}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.customers.total}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">
                  {dashboardStats.customers.change}
                </span>
                <span className="ml-1">
                  {t("admin.dashboard.stats.fromLastMonth", language)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.dashboard.stats.products", language)}
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.products.total}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">
                  {dashboardStats.products.change}
                </span>
                <span className="ml-1">
                  {t("admin.dashboard.stats.thisWeek", language)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.dashboard.stats.orders", language)}
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.orders.total}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                <span className="text-red-500">
                  {dashboardStats.orders.change}
                </span>
                <span className="ml-1">
                  {t("admin.dashboard.stats.fromLastWeek", language)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              {t("admin.dashboard.tabs.overview", language)}
            </TabsTrigger>
            <TabsTrigger value="orders">
              {t("admin.dashboard.tabs.recentOrders", language)}
            </TabsTrigger>
            <TabsTrigger value="products">
              {t("admin.dashboard.tabs.topProducts", language)}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>
                    {t("admin.dashboard.charts.salesOverview", language)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    {t("admin.dashboard.charts.placeholder", language)}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>
                    {t("admin.dashboard.charts.recentActivity", language)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {t("admin.dashboard.activity.newOrder", language)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t("admin.dashboard.activity.orderPlaced", language)}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">₩35,000</div>
                    </div>
                    <div className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {t("admin.dashboard.activity.newCustomer", language)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t(
                            "admin.dashboard.activity.customerRegistered",
                            language
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {t(
                            "admin.dashboard.activity.productUpdate",
                            language
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t(
                            "admin.dashboard.activity.inventoryUpdated",
                            language
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {t("admin.dashboard.tables.recentOrders", language)}
                </CardTitle>
                <Button variant="outline" size="sm">
                  {t("admin.dashboard.viewAll", language)}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.customer}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm">{order.product}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {getStatusBadge(order.status, language)}
                        <p className="text-sm font-medium">{order.amount}</p>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {t("admin.dashboard.tables.topProducts", language)}
                </CardTitle>
                <Button variant="outline" size="sm">
                  {t("admin.dashboard.viewAll", language)}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={product.name}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-amber-600">
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.sales}{" "}
                            {t("admin.dashboard.tables.unitsSold", language)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm font-medium">{product.revenue}</p>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
