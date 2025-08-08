"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/hooks/use-language-store";
import { t } from "@/lib/translations";
import {
  Bell,
  Check,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  Mail,
  Smartphone,
  MessageSquare,
  Settings,
  X,
} from "lucide-react";

// Mock notifications data
const notifications = [
  {
    id: "NOT-001",
    type: "order",
    title: "New Order Received",
    message: "Order #ORD-12345 has been placed by 김민수",
    timestamp: "2024-01-15T14:30:00Z",
    read: false,
    priority: "normal",
  },
  {
    id: "NOT-002",
    type: "inventory",
    title: "Low Stock Alert",
    message: "Brazilian Santos is running low (3 units remaining)",
    timestamp: "2024-01-15T13:45:00Z",
    read: false,
    priority: "high",
  },
  {
    id: "NOT-003",
    type: "customer",
    title: "New Customer Registration",
    message: "이지영 has registered as a new customer",
    timestamp: "2024-01-15T12:20:00Z",
    read: true,
    priority: "normal",
  },
  {
    id: "NOT-004",
    type: "system",
    title: "System Maintenance Scheduled",
    message: "Scheduled maintenance on 2024-01-20 at 02:00 AM",
    timestamp: "2024-01-15T10:00:00Z",
    read: true,
    priority: "low",
  },
  {
    id: "NOT-005",
    type: "order",
    title: "Order Shipped",
    message: "Order #ORD-12344 has been shipped to 박철수",
    timestamp: "2024-01-15T09:15:00Z",
    read: true,
    priority: "normal",
  },
  {
    id: "NOT-006",
    type: "inventory",
    title: "Stock Replenished",
    message: "Ethiopian Yirgacheffe inventory has been updated (+50 units)",
    timestamp: "2024-01-15T08:30:00Z",
    read: true,
    priority: "normal",
  },
];

// Notification settings
const notificationSettings = {
  email: {
    orders: true,
    customers: true,
    inventory: true,
    system: false,
  },
  push: {
    orders: true,
    customers: false,
    inventory: true,
    system: true,
  },
  sms: {
    orders: false,
    customers: false,
    inventory: true,
    system: false,
  },
};

export default function AdminNotifications() {
  const { language } = useLanguage();
  const [notificationList, setNotificationList] = useState(notifications);
  const [settings, setSettings] = useState(notificationSettings);

  const getNotificationIcon = (type: string) => {
    const icons = {
      order: ShoppingCart,
      customer: Users,
      inventory: Package,
      system: AlertTriangle,
    };
    return icons[type as keyof typeof icons] || Bell;
  };

  const getNotificationTypeColor = (type: string) => {
    const colors = {
      order: "bg-blue-100 text-blue-600",
      customer: "bg-green-100 text-green-600",
      inventory: "bg-amber-100 text-amber-600",
      system: "bg-red-100 text-red-600",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-600";
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { variant: "destructive" as const, label: "High" },
      normal: { variant: "default" as const, label: "Normal" },
      low: { variant: "secondary" as const, label: "Low" },
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.normal;
    return <Badge variant={config.variant} className="text-xs">{config.label}</Badge>;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else {
      return `${diffDays}일 전`;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotificationList(prevList =>
      prevList.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prevList =>
      prevList.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotificationList(prevList =>
      prevList.filter(notification => notification.id !== notificationId)
    );
  };

  const updateSetting = (channel: string, type: string, enabled: boolean) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [channel]: {
        ...prevSettings[channel as keyof typeof prevSettings],
        [type]: enabled,
      },
    }));
  };

  const unreadCount = notificationList.filter(n => !n.read).length;
  const highPriorityCount = notificationList.filter(n => n.priority === "high" && !n.read).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("admin.notifications.title", language)}
            </h1>
            <p className="text-muted-foreground">
              {t("admin.notifications.subtitle", language)}
            </p>
          </div>
          <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="mr-2 h-4 w-4" />
            {t("admin.notifications.markAllRead", language)}
          </Button>
        </div>

        {/* Notification Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highPriorityCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notificationList.filter(n => {
                  const notificationDate = new Date(n.timestamp);
                  const today = new Date();
                  return notificationDate.toDateString() === today.toDateString();
                }).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationList.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {notificationList.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg ${
                        !notification.read ? "bg-blue-50 border-blue-200" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${getNotificationTypeColor(
                              notification.type
                            )}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">
                                {notification.title}
                              </h4>
                              {getPriorityBadge(notification.priority)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="text-xs capitalize"
                              >
                                {t(`admin.notifications.types.${notification.type}`, language)}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                {t("admin.notifications.settings.title", language)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="h-4 w-4" />
                  <h3 className="font-medium">
                    {t("admin.notifications.settings.email", language)}
                  </h3>
                </div>
                <div className="space-y-3">
                  {Object.entries(settings.email).map(([type, enabled]) => (
                    <div key={type} className="flex items-center justify-between">
                      <Label htmlFor={`email-${type}`} className="text-sm">
                        {t(`admin.notifications.types.${type}`, language)}
                      </Label>
                      <Switch
                        id={`email-${type}`}
                        checked={enabled}
                        onCheckedChange={(checked) =>
                          updateSetting("email", type, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Push Notifications */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="h-4 w-4" />
                  <h3 className="font-medium">
                    {t("admin.notifications.settings.push", language)}
                  </h3>
                </div>
                <div className="space-y-3">
                  {Object.entries(settings.push).map(([type, enabled]) => (
                    <div key={type} className="flex items-center justify-between">
                      <Label htmlFor={`push-${type}`} className="text-sm">
                        {t(`admin.notifications.types.${type}`, language)}
                      </Label>
                      <Switch
                        id={`push-${type}`}
                        checked={enabled}
                        onCheckedChange={(checked) =>
                          updateSetting("push", type, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* SMS Notifications */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-4 w-4" />
                  <h3 className="font-medium">
                    {t("admin.notifications.settings.sms", language)}
                  </h3>
                </div>
                <div className="space-y-3">
                  {Object.entries(settings.sms).map(([type, enabled]) => (
                    <div key={type} className="flex items-center justify-between">
                      <Label htmlFor={`sms-${type}`} className="text-sm">
                        {t(`admin.notifications.types.${type}`, language)}
                      </Label>
                      <Switch
                        id={`sms-${type}`}
                        checked={enabled}
                        onCheckedChange={(checked) =>
                          updateSetting("sms", type, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}