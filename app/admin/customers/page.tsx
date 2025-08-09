"use client";
/**
 * Admin > Customers 페이지
 * - 목 고객 데이터를 기반으로 필터/검색/상세 보기 UI를 제공합니다.
 * - 실제 서버 연동 시, 필터링/정렬은 서버 쿼리 파라미터로 위임하는 것을 권장합니다.
 */

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { useLanguage } from "@/hooks/use-language-store";
import { t, Language } from "@/lib/translations";
import { CustomersStats } from "@/components/admin/customers/customers-stats";
import { CustomersFilters } from "@/components/admin/customers/customers-filters";
import { CustomersTable } from "@/components/admin/customers/customers-table";
import { CustomerDetailDialog } from "@/components/admin/customers/customer-detail-dialog";

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

// 배지/테이블/필터는 분리된 컴포넌트에서 처리합니다.

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

  const handleSearch = (value: string) => setSearchQuery(value);
  const handleStatusChange = (value: string) => setSelectedStatus(value);

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
        <CustomersStats customers={customers as any} language={language} />

        {/* Filters */}
        <CustomersFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          language={language}
        />

        {/* Customers Table */}
        <CustomersTable
          customers={filteredCustomers as any}
          language={language}
          onView={(c) => handleViewCustomer(c as any)}
        />

        {/* Customer Detail Dialog */}
        <CustomerDetailDialog
          open={isDetailDialogOpen}
          onOpenChange={setIsDetailDialogOpen}
          customer={selectedCustomer as any}
          language={language}
        />
      </div>
    </AdminLayout>
  );
}
