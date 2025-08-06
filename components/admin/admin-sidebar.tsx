"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/hooks/use-language-store";
import { t } from "@/lib/translations";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Calendar,
  BarChart3,
  Settings,
  ChevronLeft,
  Coffee,
  Bell,
  FileText,
  TrendingUp,
} from "lucide-react";

const adminMenuItems = [
  {
    title: "admin.menu.dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "admin.menu.products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "admin.menu.orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "admin.menu.customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "admin.menu.subscriptions",
    href: "/admin/subscriptions",
    icon: Calendar,
  },
  {
    title: "admin.menu.analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
];

const secondaryMenuItems = [
  {
    title: "admin.menu.reports",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    title: "admin.menu.marketing",
    href: "/admin/marketing",
    icon: TrendingUp,
  },
  {
    title: "admin.menu.notifications",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "admin.menu.settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguage();

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-amber-600" />
            <span className="text-lg font-semibold text-amber-600">
              {t("admin.title", language)}
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {/* Primary Menu */}
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    collapsed && "justify-center px-0",
                    isActive && "bg-amber-100 text-amber-900 hover:bg-amber-100"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && (
                    <span className="truncate">{t(item.title, language)}</span>
                  )}
                </Button>
              </Link>
            );
          })}

          <Separator className="my-4" />

          {/* Secondary Menu */}
          {secondaryMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    collapsed && "justify-center px-0",
                    isActive && "bg-amber-100 text-amber-900 hover:bg-amber-100"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && (
                    <span className="truncate">{t(item.title, language)}</span>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        {!collapsed ? (
          <div className="text-xs text-muted-foreground text-center">
            {t("admin.version", language)} 1.0.0
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
        )}
      </div>
    </div>
  );
}
