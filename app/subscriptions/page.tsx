"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Edit, Pause, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/translations";

type Subscription = {
  id: number;
  status: "active" | "paused";
  product: {
    id: number;
    nameKey: string;
    image: string;
  };
  frequency: string;
  nextDelivery: string | null;
  lastDelivery: string;
  quantity: number;
  price: number;
  pausedReason?: string;
};

type OrderItem = {
  id: number;
  nameKey: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  date: string;
  status: string;
  items: OrderItem[];
  total: number;
};

// Sample subscription data
const subscriptions: Subscription[] = [
  {
    id: 1,
    status: "active",
    product: {
      id: 1,
      nameKey: "ethiopianYirgacheffe",
      image: "/images/coffee/ethiopian-yirgacheffe.jpg",
    },
    frequency: "2 weeks",
    nextDelivery: "2025-05-28",
    lastDelivery: "2025-05-14",
    quantity: 1,
    price: 16.99,
  },
  {
    id: 2,
    status: "paused",
    product: {
      id: 3,
      nameKey: "decafSumatra",
      image: "/images/coffee/decaf-sumatra.jpg",
    },
    frequency: "4 weeks",
    nextDelivery: null,
    lastDelivery: "2025-04-30",
    quantity: 2,
    price: 15.99,
    pausedReason: "Vacation",
  },
];

// Sample order history
const orderHistory: Order[] = [
  {
    id: "ORD-1234",
    date: "2025-05-14",
    status: "Delivered",
    items: [
      {
        id: 1,
        nameKey: "ethiopianYirgacheffe",
        quantity: 1,
        price: 16.99,
      },
    ],
    total: 16.99,
  },
  {
    id: "ORD-1233",
    date: "2025-04-30",
    status: "Delivered",
    items: [
      {
        id: 3,
        nameKey: "decafSumatra",
        quantity: 2,
        price: 31.98,
      },
    ],
    total: 31.98,
  },
  {
    id: "ORD-1232",
    date: "2025-04-16",
    status: "Delivered",
    items: [
      {
        id: 1,
        nameKey: "ethiopianYirgacheffe",
        quantity: 1,
        price: 16.99,
      },
    ],
    total: 16.99,
  },
];

export default function MySubscriptionsPage() {
  const [activeSubscriptions, setActiveSubscriptions] =
    useState<Subscription[]>(subscriptions);
  const [editingSubscription, setEditingSubscription] =
    useState<Subscription | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const { language } = useLanguage();
  const handlePauseSubscription = (id: number) => {
    setActiveSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: "paused",
              nextDelivery: null,
              pausedReason: "Vacation",
            }
          : sub
      )
    );
    setPauseDialogOpen(false);
  };

  const handleResumeSubscription = (id: number) => {
    setActiveSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: "active",
              nextDelivery: "2025-06-11",
              pausedReason: undefined,
            }
          : sub
      )
    );
    setResumeDialogOpen(false);
  };

  const handleCancelSubscription = (id: number) => {
    setActiveSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    setCancelDialogOpen(false);
  };

  const handleEditSubscription = () => {
    // In a real app, you would update the subscription details here
    setEditDialogOpen(false);
  };

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("subscriptions.mySubscriptions", language)}
        </h1>
        <p className="text-muted-foreground">
          {t("subscriptions.manageSubscriptions", language)}
        </p>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-8">
        <TabsList>
          <TabsTrigger value="subscriptions">
            {t("subscriptions.activeSubscriptions", language)}
          </TabsTrigger>
          <TabsTrigger value="history">
            {t("subscriptions.orderHistory", language)}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-6">
          {activeSubscriptions.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">
                {t("subscriptions.noActiveSubscriptions", language)}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("subscriptions.noActiveSubscriptionsDescription", language)}
              </p>
              <Button asChild className="bg-amber-800 hover:bg-amber-900">
                <Link href="/subscriptions">
                  {t("subscriptions.browseSubscriptionPlans", language)}
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {activeSubscriptions.map((subscription) => (
                <Card key={subscription.id}>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-[1fr_2fr] gap-6">
                      <div className="relative aspect-square max-w-[200px] overflow-hidden rounded-md">
                        <Image
                          src={subscription.product.image || "/placeholder.svg"}
                          alt={t(
                            `products.${subscription.product.nameKey}.name`,
                            language
                          )}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h3 className="text-xl font-semibold">
                              {t(
                                `products.${subscription.product.nameKey}.name`,
                                language
                              )}
                            </h3>
                            <p className="text-muted-foreground">
                              {t(
                                `products.${subscription.product.nameKey}.description`,
                                language
                              )}
                            </p>
                          </div>
                          <Badge
                            variant={
                              subscription.status === "active"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              subscription.status === "active"
                                ? "bg-green-100 text-green-800 hover:bg-green-100 border-none"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-100 border-none"
                            }
                          >
                            {subscription.status === "active"
                              ? t("subscriptions.active", language)
                              : t("subscriptions.paused", language)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Frequency
                            </p>
                            <p className="font-medium flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {t("subscriptions.every", language)}{" "}
                              {subscription.frequency}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Quantity
                            </p>
                            <p className="font-medium">
                              {subscription.quantity}{" "}
                              {subscription.quantity > 1
                                ? t("subscriptions.bags", language)
                                : t("subscriptions.bag", language)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Price
                            </p>
                            <p className="font-medium">
                              {t("subscriptions.price", language)}{" "}
                              {(
                                subscription.price * subscription.quantity
                              ).toFixed(2)}{" "}
                              {t("subscriptions.perDelivery", language)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {subscription.status === "active"
                                ? t("subscriptions.nextDelivery", language)
                                : t("subscriptions.lastDelivery", language)}
                            </p>
                            <p className="font-medium flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {subscription.status === "active" &&
                              subscription.nextDelivery
                                ? new Date(
                                    subscription.nextDelivery
                                  ).toLocaleDateString()
                                : new Date(
                                    subscription.lastDelivery
                                  ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {subscription.status === "paused" && (
                          <div className="bg-muted p-3 rounded-md">
                            <p className="text-sm">
                              <span className="font-medium">
                                {t("subscriptions.paused", language)}:
                              </span>{" "}
                              {subscription.pausedReason}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Dialog
                            open={editDialogOpen}
                            onOpenChange={setEditDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setEditingSubscription(subscription)
                                }
                              >
                                <Edit className="h-4 w-4 mr-2" />{" "}
                                {t("subscriptions.edit", language)}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  {t(
                                    "subscriptions.editSubscription",
                                    language
                                  )}
                                </DialogTitle>
                                <DialogDescription>
                                  {t(
                                    "subscriptions.makeChangesToYourSubscriptionPreferences",
                                    language
                                  )}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="frequency">
                                    {t(
                                      "subscriptions.deliveryFrequency",
                                      language
                                    )}
                                  </Label>
                                  <Select
                                    defaultValue={
                                      editingSubscription?.frequency
                                    }
                                  >
                                    <SelectTrigger id="frequency">
                                      <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1 week">
                                        {t("subscriptions.weekly", language)}
                                      </SelectItem>
                                      <SelectItem value="2 weeks">
                                        {t(
                                          "subscriptions.every2Weeks",
                                          language
                                        )}
                                      </SelectItem>
                                      <SelectItem value="4 weeks">
                                        {t("subscriptions.monthly", language)}
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="quantity">
                                    {t("subscriptions.quantity", language)}
                                  </Label>
                                  <Select
                                    defaultValue={editingSubscription?.quantity.toString()}
                                  >
                                    <SelectTrigger id="quantity">
                                      <SelectValue placeholder="Select quantity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">
                                        {t("subscriptions.oneBag", language)}
                                      </SelectItem>
                                      <SelectItem value="2">
                                        {t("subscriptions.twoBags", language)}
                                      </SelectItem>
                                      <SelectItem value="3">
                                        {t("subscriptions.threeBags", language)}
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setEditDialogOpen(false)}
                                >
                                  {t("subscriptions.cancel", language)}
                                </Button>
                                <Button onClick={handleEditSubscription}>
                                  {t("subscriptions.saveChanges", language)}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {subscription.status === "active" ? (
                            <Dialog
                              open={pauseDialogOpen}
                              onOpenChange={setPauseDialogOpen}
                            >
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Pause className="h-4 w-4 mr-2" />{" "}
                                  {t("subscriptions.pause", language)}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    {t(
                                      "subscriptions.pauseSubscription",
                                      language
                                    )}
                                  </DialogTitle>
                                  <DialogDescription>
                                    {t(
                                      "subscriptions.youCanResumeYourSubscriptionAtAnyTime",
                                      language
                                    )}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="pause-reason">
                                      {t("subscriptions.reason", language)}
                                    </Label>
                                    <Select defaultValue="vacation">
                                      <SelectTrigger id="pause-reason">
                                        <SelectValue placeholder="Select a reason" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="vacation">
                                          {t(
                                            "subscriptions.goingOnVacation",
                                            language
                                          )}
                                        </SelectItem>
                                        <SelectItem value="too-much">
                                          {t(
                                            "subscriptions.haveTooMuchCoffee",
                                            language
                                          )}
                                        </SelectItem>
                                        <SelectItem value="trying-others">
                                          {t(
                                            "subscriptions.tryingOtherCoffees",
                                            language
                                          )}
                                        </SelectItem>
                                        <SelectItem value="other">
                                          {t(
                                            "subscriptions.otherReason",
                                            language
                                          )}
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setPauseDialogOpen(false)}
                                  >
                                    {t("subscriptions.cancel", language)}
                                  </Button>
                                  <Button
                                    variant="default"
                                    onClick={() =>
                                      handlePauseSubscription(subscription.id)
                                    }
                                  >
                                    {t(
                                      "subscriptions.pauseSubscription",
                                      language
                                    )}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <Dialog
                              open={resumeDialogOpen}
                              onOpenChange={setResumeDialogOpen}
                            >
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Play className="h-4 w-4 mr-2" />{" "}
                                  {t("subscriptions.resume", language)}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    {t(
                                      "subscriptions.resumeSubscription",
                                      language
                                    )}
                                  </DialogTitle>
                                  <DialogDescription>
                                    {t(
                                      "subscriptions.yourSubscriptionWillBeReactivated",
                                      language
                                    )}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <p>
                                    {t(
                                      "subscriptions.yourNextDeliveryWillBeScheduledFor",
                                      language
                                    )}{" "}
                                    <span className="font-medium">
                                      {new Date(
                                        subscription.nextDelivery || ""
                                      ).toLocaleDateString()}
                                    </span>
                                    .
                                  </p>
                                </div>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setResumeDialogOpen(false)}
                                  >
                                    {t("subscriptions.cancel", language)}
                                  </Button>
                                  <Button
                                    variant="default"
                                    onClick={() =>
                                      handleResumeSubscription(subscription.id)
                                    }
                                  >
                                    {t(
                                      "subscriptions.resumeSubscription",
                                      language
                                    )}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}

                          <Dialog
                            open={cancelDialogOpen}
                            onOpenChange={setCancelDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                {t(
                                  "subscriptions.cancelSubscription",
                                  language
                                )}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  {t(
                                    "subscriptions.cancelSubscription",
                                    language
                                  )}
                                </DialogTitle>
                                <DialogDescription>
                                  {t(
                                    "subscriptions.areYouSureYouWantToCancelYourSubscription",
                                    language
                                  )}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <p className="mb-2">
                                  {t(
                                    "subscriptions.thisWillPermanentlyCancelYourSubscriptionTo",
                                    language
                                  )}{" "}
                                  <span className="font-medium">
                                    {t(
                                      `products.${subscription.product.nameKey}.name`,
                                      language
                                    )}
                                  </span>
                                  .
                                </p>
                                <p>
                                  {t(
                                    "subscriptions.youCanAlwaysStartANewSubscriptionLater",
                                    language
                                  )}
                                </p>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setCancelDialogOpen(false)}
                                >
                                  {t(
                                    "subscriptions.keepSubscription",
                                    language
                                  )}
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    handleCancelSubscription(subscription.id)
                                  }
                                >
                                  {t(
                                    "subscriptions.cancelSubscription",
                                    language
                                  )}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-4">
            <Button asChild variant="outline">
              <Link href="/subscriptions">
                {t("subscriptions.addNewSubscription", language)}
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("subscriptions.orderHistory", language)}</CardTitle>
              <CardDescription>
                {t("subscriptions.viewYourPastCoffeeDeliveries", language)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orderHistory.length === 0 ? (
                <div className="text-center py-6">
                  <p>{t("subscriptions.youDontHaveAnyOrdersYet", language)}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 hover:bg-green-100 border-none"
                          >
                            {order.status}
                          </Badge>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/orders/${order.id}`}>
                              {t("subscriptions.viewDetails", language)}
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>
                              {item.quantity} ×{" "}
                              {t(`products.${item.nameKey}.name`, language)}
                            </span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-medium pt-2">
                        <span>{t("subscriptions.total", language)}</span>
                        <span>
                          {t("subscriptions.price", language)}{" "}
                          {order.total.toFixed(2)}
                        </span>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
