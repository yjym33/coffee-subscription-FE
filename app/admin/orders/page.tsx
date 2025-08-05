"use client";

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
import { useLanguage } from "@/hooks/use-language";
import { t, Language } from "@/lib/translations";
import {
  Search,
  Filter,
  Eye,
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    customer: {
      name: "김민수",
      email: "minsu.kim@email.com",
      phone: "010-1234-5678",
      address: "서울시 강남구 역삼동 123-45",
    },
    items: [
      {
        name: "Ethiopian Yirgacheffe",
        nameKo: "에티오피아 예가체프",
        quantity: 2,
        price: 35000,
      },
    ],
    total: 70000,
    status: "completed",
    paymentStatus: "paid",
    date: "2024-01-15T10:30:00",
    shippingDate: "2024-01-16T09:00:00",
    trackingNumber: "KR123456789",
  },
  {
    id: "ORD-002",
    customer: {
      name: "이지영",
      email: "jiyoung.lee@email.com",
      phone: "010-2345-6789",
      address: "서울시 서초구 서초동 567-89",
    },
    items: [
      {
        name: "Colombian Huila",
        nameKo: "콜롬비아 우일라",
        quantity: 1,
        price: 42000,
      },
    ],
    total: 42000,
    status: "processing",
    paymentStatus: "paid",
    date: "2024-01-15T14:20:00",
    shippingDate: null,
    trackingNumber: null,
  },
  {
    id: "ORD-003",
    customer: {
      name: "박철수",
      email: "cheolsu.park@email.com",
      phone: "010-3456-7890",
      address: "부산시 해운대구 우동 789-12",
    },
    items: [
      {
        name: "Brazilian Santos",
        nameKo: "브라질 산토스",
        quantity: 1,
        price: 38000,
      },
      {
        name: "House Blend",
        nameKo: "하우스 블렌드",
        quantity: 1,
        price: 32000,
      },
    ],
    total: 70000,
    status: "shipped",
    paymentStatus: "paid",
    date: "2024-01-14T16:45:00",
    shippingDate: "2024-01-15T11:00:00",
    trackingNumber: "KR987654321",
  },
  {
    id: "ORD-004",
    customer: {
      name: "최영희",
      email: "younghee.choi@email.com",
      phone: "010-4567-8901",
      address: "대구시 중구 동성로 345-67",
    },
    items: [
      {
        name: "Guatemalan Antigua",
        nameKo: "과테말라 안티구아",
        quantity: 3,
        price: 45000,
      },
    ],
    total: 135000,
    status: "cancelled",
    paymentStatus: "refunded",
    date: "2024-01-14T09:15:00",
    shippingDate: null,
    trackingNumber: null,
  },
];

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

function getPaymentStatusBadge(status: string, language: string) {
  const statusConfig = {
    pending: {
      variant: "secondary" as const,
      label: t("admin.orders.payment.pending", language as Language),
    },
    paid: {
      variant: "default" as const,
      label: t("admin.orders.payment.paid", language as Language),
    },
    refunded: {
      variant: "destructive" as const,
      label: t("admin.orders.payment.refunded", language as Language),
    },
    failed: {
      variant: "destructive" as const,
      label: t("admin.orders.payment.failed", language as Language),
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export default function AdminOrders() {
  const { language } = useLanguage();
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.includes(searchQuery) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === "ko" ? "ko-KR" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("admin.orders.title", language)}
            </h1>
            <p className="text-muted-foreground">
              {t("admin.orders.subtitle", language)}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.orders.stats.total", language)}
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.orders.stats.processing", language)}
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter((o) => o.status === "processing").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.orders.stats.shipped", language)}
              </CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter((o) => o.status === "shipped").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("admin.orders.stats.completed", language)}
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter((o) => o.status === "completed").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("admin.orders.searchPlaceholder", language)}
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
                {t("admin.orders.filter.all", language)}
              </SelectItem>
              <SelectItem value="pending">
                {t("admin.orders.status.pending", language)}
              </SelectItem>
              <SelectItem value="processing">
                {t("admin.orders.status.processing", language)}
              </SelectItem>
              <SelectItem value="shipped">
                {t("admin.orders.status.shipped", language)}
              </SelectItem>
              <SelectItem value="completed">
                {t("admin.orders.status.completed", language)}
              </SelectItem>
              <SelectItem value="cancelled">
                {t("admin.orders.status.cancelled", language)}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("admin.orders.table.order", language)}</TableHead>
                <TableHead>
                  {t("admin.orders.table.customer", language)}
                </TableHead>
                <TableHead>{t("admin.orders.table.items", language)}</TableHead>
                <TableHead>{t("admin.orders.table.total", language)}</TableHead>
                <TableHead>
                  {t("admin.orders.table.status", language)}
                </TableHead>
                <TableHead>
                  {t("admin.orders.table.payment", language)}
                </TableHead>
                <TableHead className="text-right">
                  {t("admin.orders.table.actions", language)}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
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
                  <TableCell>
                    {getStatusBadge(order.status, language)}
                  </TableCell>
                  <TableCell>
                    {getPaymentStatusBadge(order.paymentStatus, language)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Select
                        value={order.status}
                        onValueChange={(value) =>
                          handleUpdateOrderStatus(order.id, value)
                        }
                      >
                        <SelectTrigger className="w-[120px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">
                            {t("admin.orders.status.pending", language)}
                          </SelectItem>
                          <SelectItem value="processing">
                            {t("admin.orders.status.processing", language)}
                          </SelectItem>
                          <SelectItem value="shipped">
                            {t("admin.orders.status.shipped", language)}
                          </SelectItem>
                          <SelectItem value="completed">
                            {t("admin.orders.status.completed", language)}
                          </SelectItem>
                          <SelectItem value="cancelled">
                            {t("admin.orders.status.cancelled", language)}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Order Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {t("admin.orders.orderDetails", language)} - {selectedOrder?.id}
              </DialogTitle>
              <DialogDescription>
                {selectedOrder && formatDate(selectedOrder.date)}
              </DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {t("admin.orders.customerInfo", language)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedOrder.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedOrder.customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedOrder.customer.address}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {t("admin.orders.orderItems", language)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: any, index: number) => (
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
                        <span>₩{selectedOrder.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Info */}
                {selectedOrder.trackingNumber && (
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
                          <span>{selectedOrder.trackingNumber}</span>
                        </div>
                        {selectedOrder.shippingDate && (
                          <div>
                            <span className="font-medium">
                              {t("admin.orders.shippingDate", language)}:{" "}
                            </span>
                            <span>
                              {formatDate(selectedOrder.shippingDate)}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
