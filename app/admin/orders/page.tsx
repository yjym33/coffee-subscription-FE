"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language-store";
import { t, Language } from "@/lib/translations";
import { Package, Clock, Truck, CheckCircle } from "lucide-react";
import { OrdersFilters } from "@/components/admin/orders/orders-filters";
import { OrdersTable } from "@/components/admin/orders/orders-table";
import { OrderDetailDialog } from "@/components/admin/orders/order-detail-dialog";

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

// 배지/테이블/필터/상세는 분리된 컴포넌트에서 처리합니다.

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
        <OrdersFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          language={language}
        />

        {/* Orders Table */}
        <OrdersTable
          orders={filteredOrders as any}
          language={language}
          onView={(o) => handleViewOrder(o as any)}
          onStatusChange={handleUpdateOrderStatus}
        />

        {/* Order Detail Dialog */}
        <OrderDetailDialog
          open={isDetailDialogOpen}
          onOpenChange={setIsDetailDialogOpen}
          order={selectedOrder as any}
          language={language}
        />
      </div>
    </AdminLayout>
  );
}
