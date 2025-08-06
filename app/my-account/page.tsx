"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  MapPin,
  ShoppingBag,
  Settings,
  Edit,
  Plus,
  Eye,
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language-store";
import { t } from "@/lib/translations";

export default function MyAccountPage() {
  const { language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "김현우",
    email: "kim.hyunwoo@email.com",
    phone: "010-1234-5678",
    birthday: "1990-05-15",
  });

  // Mock data for orders
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "delivered",
      total: 45.97,
      items: ["Colombian Supremo", "Ethiopian Yirgacheffe"],
    },
    {
      id: "ORD-002",
      date: "2024-01-01",
      status: "processing",
      total: 32.99,
      items: ["Breakfast Blend"],
    },
    {
      id: "ORD-003",
      date: "2023-12-20",
      status: "cancelled",
      total: 28.5,
      items: ["Decaf Sumatra"],
    },
  ];

  // Mock data for addresses
  const addresses = [
    {
      id: 1,
      name: "집",
      isDefault: true,
      address: "서울특별시 강남구 테헤란로 123",
      detail: "456호",
      zipCode: "06142",
    },
    {
      id: 2,
      name: "회사",
      isDefault: false,
      address: "서울특별시 중구 세종대로 110",
      detail: "8층",
      zipCode: "04512",
    },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        {t(`myAccount.orders.statuses.${status}`, language)}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {t("myAccount.title", language)}
      </h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {t("myAccount.profile.title", language)}
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {t("myAccount.addresses.title", language)}
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            {t("myAccount.orders.title", language)}
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t("myAccount.preferences.title", language)}
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t("myAccount.profile.title", language)}</CardTitle>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {t("myAccount.profile.edit", language)}
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                  >
                    {t("myAccount.profile.cancel", language)}
                  </Button>
                  <Button size="sm" onClick={handleSaveProfile}>
                    {t("myAccount.profile.save", language)}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">
                    {t("myAccount.profile.name", language)}
                  </Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">
                    {t("myAccount.profile.email", language)}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">
                    {t("myAccount.profile.phone", language)}
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="birthday">
                    {t("myAccount.profile.birthday", language)}
                  </Label>
                  <Input
                    id="birthday"
                    type="date"
                    value={profileData.birthday}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        birthday: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {t("myAccount.addresses.title", language)}
              </h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t("myAccount.addresses.add", language)}
              </Button>
            </div>

            <div className="grid gap-4">
              {addresses.map((address) => (
                <Card key={address.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{address.name}</h4>
                          {address.isDefault && (
                            <Badge variant="secondary">
                              {t("myAccount.addresses.default", language)}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {address.address}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.detail} ({address.zipCode})
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          {t("myAccount.addresses.edit", language)}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t("myAccount.addresses.delete", language)}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>{t("myAccount.orders.title", language)}</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {t("myAccount.orders.noOrders", language)}
                </p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-4">
                              <span className="font-medium">
                                {t("myAccount.orders.orderNumber", language)}:{" "}
                                {order.id}
                              </span>
                              {getStatusBadge(order.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {t("myAccount.orders.date", language)}:{" "}
                              {order.date}
                            </p>
                            <p className="text-sm">{order.items.join(", ")}</p>
                            <p className="font-medium">
                              {t("myAccount.orders.total", language)}: $
                              {order.total}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            {t("myAccount.orders.viewDetails", language)}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>
                {t("myAccount.preferences.title", language)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <Label>{t("myAccount.preferences.language", language)}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === "ko" ? "한국어" : "English"}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  {t("myAccount.profile.edit", language)}
                </Button>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <Label>{t("myAccount.preferences.theme", language)}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("theme.light", language)}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  {t("myAccount.profile.edit", language)}
                </Button>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <Label htmlFor="notifications">
                    {t("myAccount.preferences.notifications", language)}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "myAccount.preferences.notificationDescription",
                      language
                    )}
                  </p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <Label htmlFor="marketing">
                    {t("myAccount.preferences.marketing", language)}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t("myAccount.preferences.marketingDescription", language)}
                  </p>
                </div>
                <Switch id="marketing" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
