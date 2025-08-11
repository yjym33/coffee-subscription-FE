"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { SimpleBarChart } from "@/components/admin/charts/simple-bar-chart";
import { SimpleLineChart } from "@/components/admin/charts/simple-line-chart";
import { SimplePieChart } from "@/components/admin/charts/simple-pie-chart";
import { useLanguage } from "@/hooks/use-language-store";
import { t } from "@/lib/translations";
import {
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  Coffee,
  ShoppingCart,
  Calendar,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  AlertTriangle,
} from "lucide-react";

// Mock analytics data
const analyticsData = {
  revenue: {
    total: 12450000,
    monthlyGrowth: 15.2,
    averageOrderValue: 42500,
    monthlyData: [
      { month: "Jan", value: 8500000 },
      { month: "Feb", value: 9200000 },
      { month: "Mar", value: 10100000 },
      { month: "Apr", value: 9800000 },
      { month: "May", value: 11200000 },
      { month: "Jun", value: 12450000 },
    ],
  },
  customers: {
    total: 1234,
    newCustomers: 89,
    retention: 78.5,
    lifetimeValue: 285000,
    segments: {
      new: 15,
      returning: 65,
      vip: 20,
    },
  },
  products: {
    totalProducts: 87,
    topProducts: [
      { name: "Ethiopian Yirgacheffe", sales: 245, revenue: 8575000 },
      { name: "Colombian Huila", sales: 198, revenue: 8316000 },
      { name: "Brazilian Santos", sales: 167, revenue: 6346000 },
      { name: "Guatemalan Antigua", sales: 134, revenue: 6030000 },
    ],
    lowStock: [
      { name: "Brazilian Santos", stock: 3, threshold: 10 },
      { name: "Costa Rican Tarrazú", stock: 7, threshold: 15 },
    ],
    profitMargin: 42.8,
  },
  subscriptions: {
    active: 456,
    churnRate: 5.2,
    averageLifetime: 18.5,
    frequencyDistribution: {
      weekly: 35,
      biweekly: 45,
      monthly: 20,
    },
  },
};

export default function AdminAnalytics() {
  const { language } = useLanguage();

  const formatCurrency = (amount: number) => {
    return `₩${amount.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("admin.analytics.title", language)}
            </h1>
            <p className="text-muted-foreground">
              {t("admin.analytics.subtitle", language)}
            </p>
          </div>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">
              {t("admin.analytics.revenue.title", language)}
            </TabsTrigger>
            <TabsTrigger value="customers">
              {t("admin.analytics.customers.title", language)}
            </TabsTrigger>
            <TabsTrigger value="products">
              {t("admin.analytics.products.title", language)}
            </TabsTrigger>
            <TabsTrigger value="subscriptions">
              {t("admin.analytics.subscriptions.title", language)}
            </TabsTrigger>
          </TabsList>

          {/* Revenue Analytics */}
          <TabsContent value="revenue" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("admin.analytics.revenue.totalRevenue", language)}
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(analyticsData.revenue.total)}
                  </div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    +{analyticsData.revenue.monthlyGrowth}% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("admin.analytics.revenue.monthlyGrowth", language)}
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPercentage(analyticsData.revenue.monthlyGrowth)}
                  </div>
                  <Progress
                    value={analyticsData.revenue.monthlyGrowth}
                    className="mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("admin.analytics.revenue.averageOrderValue", language)}
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(analyticsData.revenue.averageOrderValue)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Per order average
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleLineChart 
                  data={analyticsData.revenue.monthlyData.map(item => ({
                    label: item.month,
                    value: item.value
                  }))}
                  height={300}
                  color="#3b82f6"
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Analytics */}
          <TabsContent value="customers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("admin.analytics.customers.newCustomers", language)}
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.customers.newCustomers}
                  </div>
                  <div className="text-xs text-muted-foreground">This month</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("admin.analytics.customers.customerRetention", language)}
                  </CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPercentage(analyticsData.customers.retention)}
                  </div>
                  <Progress
                    value={analyticsData.customers.retention}
                    className="mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("admin.analytics.customers.lifetimeValue", language)}
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(analyticsData.customers.lifetimeValue)}
                  </div>
                  <div className="text-xs text-muted-foreground">Average CLV</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.customers.total}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Active customers
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Segments */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <SimplePieChart 
                    data={[
                      { 
                        label: "New Customers", 
                        value: analyticsData.customers.segments.new,
                        color: "#3b82f6"
                      },
                      { 
                        label: "Returning Customers", 
                        value: analyticsData.customers.segments.returning,
                        color: "#10b981"
                      },
                      { 
                        label: "VIP Customers", 
                        value: analyticsData.customers.segments.vip,
                        color: "#f59e0b"
                      }
                    ]}
                    size={250}
                    showPercentages={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Product Analytics */}
          <TabsContent value="products" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("admin.analytics.products.topProducts", language)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleBarChart 
                    data={analyticsData.products.topProducts.map(product => ({
                      label: product.name.split(' ')[0], // Abbreviated names for chart
                      value: product.revenue
                    }))}
                    height={280}
                    color="#f59e0b"
                    showValues={true}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>
                    {t("admin.analytics.products.lowStock", language)}
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.products.lowStock.map((product) => (
                      <div
                        key={product.name}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Threshold: {product.threshold} units
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium text-red-500">
                            {product.stock} left
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  {t("admin.analytics.products.profitMargins", language)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold">
                    {formatPercentage(analyticsData.products.profitMargin)}
                  </div>
                  <div className="flex-1">
                    <Progress
                      value={analyticsData.products.profitMargin}
                      className="h-2"
                    />
                  </div>
                  <div className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Healthy margin
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Analytics */}
          <TabsContent value="subscriptions" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t(
                      "admin.analytics.subscriptions.activeSubscriptions",
                      language
                    )}
                  </CardTitle>
                  <Coffee className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.subscriptions.active}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Currently active
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("admin.analytics.subscriptions.churnRate", language)}
                  </CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPercentage(analyticsData.subscriptions.churnRate)}
                  </div>
                  <div className="text-xs text-red-600">Monthly churn</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t(
                      "admin.analytics.subscriptions.averageLifetime",
                      language
                    )}
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData.subscriptions.averageLifetime} months
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Average lifetime
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subscription Frequency Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Subscription Frequency Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Weekly</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={analyticsData.subscriptions.frequencyDistribution.weekly}
                        className="w-32"
                      />
                      <span className="text-sm font-medium">
                        {analyticsData.subscriptions.frequencyDistribution.weekly}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Bi-weekly</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={analyticsData.subscriptions.frequencyDistribution.biweekly}
                        className="w-32"
                      />
                      <span className="text-sm font-medium">
                        {analyticsData.subscriptions.frequencyDistribution.biweekly}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Monthly</span>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={analyticsData.subscriptions.frequencyDistribution.monthly}
                        className="w-32"
                      />
                      <span className="text-sm font-medium">
                        {analyticsData.subscriptions.frequencyDistribution.monthly}%
                      </span>
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