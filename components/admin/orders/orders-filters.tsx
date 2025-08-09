"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { t, type Language } from "@/lib/translations";
import { Filter, Search } from "lucide-react";

export function OrdersFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  language,
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  language: Language;
}) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("admin.orders.searchPlaceholder", language)}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          data-testid="orders-search"
        />
      </div>
      <Select value={selectedStatus} onValueChange={onStatusChange}>
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
  );
}
