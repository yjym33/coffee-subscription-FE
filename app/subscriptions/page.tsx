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

// Sample subscription data
const subscriptions = [
  {
    id: 1,
    status: "active",
    product: {
      id: 1,
      name: "Ethiopian Yirgacheffe",
      image: "/placeholder.svg?height=300&width=300",
      description: "Bright, floral notes with citrus acidity",
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
      name: "Decaf Sumatra",
      image: "/placeholder.svg?height=300&width=300",
      description: "Earthy, herbal with low acidity",
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
const orderHistory = [
  {
    id: "ORD-1234",
    date: "2025-05-14",
    status: "Delivered",
    items: [
      {
        id: 1,
        name: "Ethiopian Yirgacheffe",
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
        name: "Decaf Sumatra",
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
        name: "Ethiopian Yirgacheffe",
        quantity: 1,
        price: 16.99,
      },
    ],
    total: 16.99,
  },
];

export default function MySubscriptionsPage() {
  const [activeSubscriptions, setActiveSubscriptions] = useState(subscriptions);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const handlePauseSubscription = (id) => {
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

  const handleResumeSubscription = (id) => {
    setActiveSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: "active",
              nextDelivery: "2025-06-11",
              pausedReason: null,
            }
          : sub
      )
    );
    setResumeDialogOpen(false);
  };

  const handleCancelSubscription = (id) => {
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
        <h1 className="text-3xl font-bold tracking-tight">My Subscriptions</h1>
        <p className="text-muted-foreground">
          Manage your coffee subscriptions and view your order history
        </p>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-8">
        <TabsList>
          <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-6">
          {activeSubscriptions.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">
                No active subscriptions
              </h3>
              <p className="text-muted-foreground mb-4">
                You don&apos;t have any active coffee subscriptions
              </p>
              <Button asChild className="bg-amber-800 hover:bg-amber-900">
                <Link href="/subscriptions">Browse Subscription Plans</Link>
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
                          alt={subscription.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h3 className="text-xl font-semibold">
                              {subscription.product.name}
                            </h3>
                            <p className="text-muted-foreground">
                              {subscription.product.description}
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
                              ? "Active"
                              : "Paused"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Frequency
                            </p>
                            <p className="font-medium flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Every {subscription.frequency}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Quantity
                            </p>
                            <p className="font-medium">
                              {subscription.quantity}{" "}
                              {subscription.quantity > 1 ? "bags" : "bag"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Price
                            </p>
                            <p className="font-medium">
                              $
                              {(
                                subscription.price * subscription.quantity
                              ).toFixed(2)}{" "}
                              per delivery
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {subscription.status === "active"
                                ? "Next Delivery"
                                : "Last Delivery"}
                            </p>
                            <p className="font-medium flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {subscription.status === "active"
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
                              <span className="font-medium">Paused:</span>{" "}
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
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Subscription</DialogTitle>
                                <DialogDescription>
                                  Make changes to your subscription preferences
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="frequency">
                                    Delivery Frequency
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
                                        Weekly
                                      </SelectItem>
                                      <SelectItem value="2 weeks">
                                        Every 2 Weeks
                                      </SelectItem>
                                      <SelectItem value="4 weeks">
                                        Monthly
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="quantity">Quantity</Label>
                                  <Select
                                    defaultValue={editingSubscription?.quantity.toString()}
                                  >
                                    <SelectTrigger id="quantity">
                                      <SelectValue placeholder="Select quantity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1 Bag</SelectItem>
                                      <SelectItem value="2">2 Bags</SelectItem>
                                      <SelectItem value="3">3 Bags</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setEditDialogOpen(false)}
                                >
                                  Cancel
                                </Button>
                                <Button onClick={handleEditSubscription}>
                                  Save Changes
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
                                  <Pause className="h-4 w-4 mr-2" /> Pause
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Pause Subscription</DialogTitle>
                                  <DialogDescription>
                                    You can resume your subscription at any time
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="pause-reason">
                                      Reason (optional)
                                    </Label>
                                    <Select defaultValue="vacation">
                                      <SelectTrigger id="pause-reason">
                                        <SelectValue placeholder="Select a reason" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="vacation">
                                          Going on vacation
                                        </SelectItem>
                                        <SelectItem value="too-much">
                                          Have too much coffee
                                        </SelectItem>
                                        <SelectItem value="trying-others">
                                          Trying other coffees
                                        </SelectItem>
                                        <SelectItem value="other">
                                          Other reason
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
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="default"
                                    onClick={() =>
                                      handlePauseSubscription(subscription.id)
                                    }
                                  >
                                    Pause Subscription
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
                                  <Play className="h-4 w-4 mr-2" /> Resume
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Resume Subscription</DialogTitle>
                                  <DialogDescription>
                                    Your subscription will be reactivated
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <p>
                                    Your next delivery will be scheduled for{" "}
                                    <span className="font-medium">
                                      June 11, 2025
                                    </span>
                                    .
                                  </p>
                                </div>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setResumeDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="default"
                                    onClick={() =>
                                      handleResumeSubscription(subscription.id)
                                    }
                                  >
                                    Resume Subscription
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
                                Cancel Subscription
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Cancel Subscription</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to cancel your
                                  subscription?
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <p className="mb-2">
                                  This will permanently cancel your subscription
                                  to{" "}
                                  <span className="font-medium">
                                    {subscription.product.name}
                                  </span>
                                  .
                                </p>
                                <p>
                                  You can always start a new subscription later.
                                </p>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setCancelDialogOpen(false)}
                                >
                                  Keep Subscription
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    handleCancelSubscription(subscription.id)
                                  }
                                >
                                  Cancel Subscription
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
              <Link href="/subscriptions">Add New Subscription</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View your past coffee deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orderHistory.length === 0 ? (
                <div className="text-center py-6">
                  <p>You don&apos;t have any orders yet.</p>
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
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>
                              {item.quantity} × {item.name}
                            </span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-medium pt-2">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
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
