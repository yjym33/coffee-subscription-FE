"use client";
/**
 * Admin > Customers 페이지
 * - 목 고객 데이터를 기반으로 필터/검색/상세 보기 UI를 제공합니다.
 * - 실제 서버 연동 시, 필터링/정렬은 서버 쿼리 파라미터로 위임하는 것을 권장합니다.
 */

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/hooks/use-language-store";
import { t, Language } from "@/lib/translations";
import {
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

// Mock customer data
const mockCustomers = [
  {
    id: "1",
    name: "김민수",
    email: "minsu.kim@email.com",
    phone: "010-1234-5678",
    address: "서울시 강남구 역삼동 123-45",
    status: "active",
    joinDate: "2023-12-15",
    lastOrder: "2024-01-15",
    totalOrders: 12,
    totalSpent: 420000,
    subscriptionStatus: "active",
    preferences: {
      acidity: 4,
      body: 3,
      caffeine: 5,
    },
  },
  {
    id: "2",
    name: "이지영",
    email: "jiyoung.lee@email.com",
    phone: "010-2345-6789",
    address: "서울시 서초구 서초동 567-89",
    status: "active",
    joinDate: "2024-01-02",
    lastOrder: "2024-01-15",
    totalOrders: 3,
    totalSpent: 126000,
    subscriptionStatus: "paused",
    preferences: {
      acidity: 2,
      body: 5,
      caffeine: 3,
    },
  },
  {
    id: "3",
    name: "박철수",
    email: "cheolsu.park@email.com",
    phone: "010-3456-7890",
    address: "부산시 해운대구 우동 789-12",
    status: "active",
    joinDate: "2023-11-20",
    lastOrder: "2024-01-14",
    totalOrders: 8,
    totalSpent: 280000,
    subscriptionStatus: "active",
    preferences: {
      acidity: 3,
      body: 4,
      caffeine: 4,
    },
  },
  {
    id: "4",
    name: "최영희",
    email: "younghee.choi@email.com",
    phone: "010-4567-8901",
    address: "대구시 중구 동성로 345-67",
    status: "inactive",
    joinDate: "2023-10-05",
    lastOrder: "2023-12-20",
    totalOrders: 15,
    totalSpent: 525000,
    subscriptionStatus: "cancelled",
    preferences: {
      acidity: 5,
      body: 2,
      caffeine: 4,
    },
  },
];

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
      label: t("admin.customers.subscription.active", language as Language),
    },
    paused: {
      variant: "secondary" as const,
      label: t("admin.customers.subscription.paused", language as Language),
    },
    cancelled: {
      variant: "destructive" as const,
      label: t("admin.customers.subscription.cancelled", language as Language),
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export default function AdminCustomers() {
  const { language } = useLanguage();
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    const matchesStatus =
      selectedStatus === "all" || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDetailDialogOpen(true);
  };

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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("admin.customers.title", language)}
            </h1>
            <p className="text-muted-foreground">
              {t("admin.customers.subtitle", language)}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.customers.stats.total", language)}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
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
              <div className="text-2xl font-bold">
                {customers.filter((c) => c.status === "active").length}
              </div>
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
              <div className="text-2xl font-bold">
                {
                  customers.filter((c) => c.subscriptionStatus === "active")
                    .length
                }
              </div>
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
              <div className="text-2xl font-bold">
                {customers.filter((c) => c.status === "inactive").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("admin.customers.searchPlaceholder", language)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("admin.customers.filter.all", language)}
              </SelectItem>
              <SelectItem value="active">
                {t("admin.customers.status.active", language)}
              </SelectItem>
              <SelectItem value="inactive">
                {t("admin.customers.status.inactive", language)}
              </SelectItem>
              <SelectItem value="suspended">
                {t("admin.customers.status.suspended", language)}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Customers Table */}
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
                <TableHead>
                  {t("admin.customers.table.orders", language)}
                </TableHead>
                <TableHead>
                  {t("admin.customers.table.spent", language)}
                </TableHead>
                <TableHead>
                  {t("admin.customers.table.status", language)}
                </TableHead>
                <TableHead>
                  {t("admin.customers.table.subscription", language)}
                </TableHead>
                <TableHead className="text-right">
                  {t("admin.customers.table.actions", language)}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
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
                      <div className="text-sm text-muted-foreground">
                        {t("admin.customers.lastOrder", language)}{" "}
                        {formatDate(customer.lastOrder)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ₩{customer.totalSpent.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(customer.status, language)}
                  </TableCell>
                  <TableCell>
                    {getSubscriptionBadge(
                      customer.subscriptionStatus,
                      language
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewCustomer(customer)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Customer Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {t("admin.customers.customerDetails", language)} -{" "}
                {selectedCustomer?.name}
              </DialogTitle>
              <DialogDescription>
                {selectedCustomer &&
                  `${t("admin.customers.joinedOn", language)} ${formatDate(
                    selectedCustomer.joinDate
                  )}`}
              </DialogDescription>
            </DialogHeader>

            {selectedCustomer && (
              <div className="space-y-6">
                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {t("admin.customers.contactInfo", language)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.address}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Statistics */}
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
                          {selectedCustomer.totalOrders}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {t("admin.customers.totalOrders", language)}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">
                          ₩{selectedCustomer.totalSpent.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {t("admin.customers.totalSpent", language)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Taste Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {t("admin.customers.tastePreferences", language)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>{t("admin.customers.acidity", language)}</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-3 h-3 rounded-full ${
                                level <= selectedCustomer.preferences.acidity
                                  ? "bg-amber-500"
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{t("admin.customers.body", language)}</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-3 h-3 rounded-full ${
                                level <= selectedCustomer.preferences.body
                                  ? "bg-amber-500"
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{t("admin.customers.caffeine", language)}</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-3 h-3 rounded-full ${
                                level <= selectedCustomer.preferences.caffeine
                                  ? "bg-amber-500"
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
