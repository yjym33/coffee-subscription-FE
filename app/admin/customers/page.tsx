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

import { mockCustomers } from "@/data/admin/customers";

// 배지/테이블/필터는 분리된 컴포넌트에서 처리합니다.

export default function AdminCustomers() {
  const { language } = useLanguage();
  const [customers, setCustomers] = useState([...mockCustomers]);
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
