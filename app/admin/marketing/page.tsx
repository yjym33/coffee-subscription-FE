"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/hooks/use-language-store";
import { t } from "@/lib/translations";
import {
  Plus,
  Mail,
  Megaphone,
  Gift,
  Eye,
  Edit,
  Trash2,
  Users,
  Send,
  Calendar,
  TrendingUp,
  Percent,
} from "lucide-react";

// Mock marketing data
const campaigns = [
  {
    id: "CAM-001",
    name: "New Year Coffee Special",
    type: "email",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    recipients: 1234,
    opens: 856,
    clicks: 234,
    conversions: 45,
    revenue: 1890000,
  },
  {
    id: "CAM-002",
    name: "Ethiopian Coffee Launch",
    type: "email",
    status: "completed",
    startDate: "2023-12-15",
    endDate: "2024-01-15",
    recipients: 987,
    opens: 678,
    clicks: 189,
    conversions: 32,
    revenue: 1344000,
  },
  {
    id: "CAM-003",
    name: "Valentine's Day Bundle",
    type: "promotion",
    status: "draft",
    startDate: "2024-02-01",
    endDate: "2024-02-14",
    recipients: 0,
    opens: 0,
    clicks: 0,
    conversions: 0,
    revenue: 0,
  },
];

const emailTemplates = [
  {
    id: "TPL-001",
    name: "Welcome Series - Part 1",
    category: "welcome",
    lastUsed: "2024-01-14",
    usage: 234,
  },
  {
    id: "TPL-002",
    name: "Monthly Newsletter",
    category: "newsletter",
    lastUsed: "2024-01-10",
    usage: 1456,
  },
  {
    id: "TPL-003",
    name: "Subscription Reminder",
    category: "reminder",
    lastUsed: "2024-01-12",
    usage: 567,
  },
  {
    id: "TPL-004",
    name: "Product Launch",
    category: "promotion",
    lastUsed: "2023-12-28",
    usage: 89,
  },
];

const coupons = [
  {
    id: "CPN-001",
    code: "NEWUSER20",
    discount: "20%",
    type: "percentage",
    status: "active",
    usageCount: 145,
    usageLimit: 500,
    expiryDate: "2024-03-31",
  },
  {
    id: "CPN-002",
    code: "SAVE5000",
    discount: "₩5,000",
    type: "fixed",
    status: "active",
    usageCount: 78,
    usageLimit: 200,
    expiryDate: "2024-02-29",
  },
  {
    id: "CPN-003",
    code: "EXPIRED10",
    discount: "10%",
    type: "percentage",
    status: "expired",
    usageCount: 234,
    usageLimit: 300,
    expiryDate: "2024-01-15",
  },
];

export default function AdminMarketing() {
  const { language } = useLanguage();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === "ko" ? "ko-KR" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, label: "Active" },
      completed: { variant: "secondary" as const, label: "Completed" },
      draft: { variant: "outline" as const, label: "Draft" },
      expired: { variant: "destructive" as const, label: "Expired" },
      paused: { variant: "secondary" as const, label: "Paused" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const calculateOpenRate = (opens: number, recipients: number) => {
    if (recipients === 0) return "0%";
    return `${((opens / recipients) * 100).toFixed(1)}%`;
  };

  const calculateClickRate = (clicks: number, opens: number) => {
    if (opens === 0) return "0%";
    return `${((clicks / opens) * 100).toFixed(1)}%`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("admin.marketing.title", language)}
            </h1>
            <p className="text-muted-foreground">
              {t("admin.marketing.subtitle", language)}
            </p>
          </div>
        </div>

        {/* Marketing Tabs */}
        <Tabs defaultValue="campaigns" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campaigns">
              {t("admin.marketing.campaigns.title", language)}
            </TabsTrigger>
            <TabsTrigger value="email">
              {t("admin.marketing.email.title", language)}
            </TabsTrigger>
            <TabsTrigger value="discounts">
              {t("admin.marketing.discounts.title", language)}
            </TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {t("admin.marketing.campaigns.title", language)}
              </h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t("admin.marketing.campaigns.create", language)}
              </Button>
            </div>

            {/* Campaign Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("admin.marketing.campaigns.active", language)}
                  </CardTitle>
                  <Megaphone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campaigns.filter(c => c.status === "active").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Recipients
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, c) => sum + c.recipients, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Conversions
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, c) => sum + c.conversions, 0)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Campaign Revenue
                  </CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₩{campaigns.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Campaigns Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Open Rate</TableHead>
                      <TableHead>Click Rate</TableHead>
                      <TableHead>Conversions</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                        <TableCell>{campaign.recipients.toLocaleString()}</TableCell>
                        <TableCell>
                          {calculateOpenRate(campaign.opens, campaign.recipients)}
                        </TableCell>
                        <TableCell>
                          {calculateClickRate(campaign.clicks, campaign.opens)}
                        </TableCell>
                        <TableCell>{campaign.conversions}</TableCell>
                        <TableCell>₩{campaign.revenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Marketing Tab */}
          <TabsContent value="email" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {t("admin.marketing.email.title", language)}
              </h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("admin.marketing.email.templates", language)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emailTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Category: {template.category} | Used: {template.usage} times
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Last used: {formatDate(template.lastUsed)}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Newsletter Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Subscribers</span>
                      <span className="font-semibold">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Open Rate</span>
                      <span className="font-semibold">42.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Click Rate</span>
                      <span className="font-semibold">8.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Unsubscribe Rate</span>
                      <span className="font-semibold">0.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Discounts Tab */}
          <TabsContent value="discounts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {t("admin.marketing.discounts.title", language)}
              </h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t("admin.marketing.discounts.create", language)}
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("admin.marketing.discounts.active", language)}
                  </CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {coupons.filter(c => c.status === "active").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Uses
                  </CardTitle>
                  <Percent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {coupons.reduce((sum, c) => sum + c.usageCount, 0)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("admin.marketing.discounts.expired", language)}
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {coupons.filter(c => c.status === "expired").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Coupons</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coupons.map((coupon) => (
                      <TableRow key={coupon.id}>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {coupon.code}
                          </code>
                        </TableCell>
                        <TableCell className="font-medium">
                          {coupon.discount}
                        </TableCell>
                        <TableCell>{getStatusBadge(coupon.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{coupon.usageCount}/{coupon.usageLimit}</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-amber-600 h-2 rounded-full"
                                style={{
                                  width: `${(coupon.usageCount / coupon.usageLimit) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(coupon.expiryDate)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}