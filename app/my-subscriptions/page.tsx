"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Coffee,
  Settings,
  Play,
  Pause,
  X,
  SkipForward,
  Plus,
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language-store";
import { t } from "@/lib/translations";
import {
  subscriptionPlans,
  getActiveSubscriptions,
  getPausedSubscriptions,
  getCancelledSubscriptions,
  Subscription,
} from "@/data/subscription-data";

export default function MySubscriptionsPage() {
  const { language } = useLanguage();

  // Use centralized subscription data
  const [subscriptions] = useState<Subscription[]>(subscriptionPlans);

  const activeSubscriptions = getActiveSubscriptions();
  const pausedSubscriptions = getPausedSubscriptions();
  const cancelledSubscriptions = getCancelledSubscriptions();

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        {t(`mySubscriptions.statuses.${status}`, language)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === "ko" ? "ko-KR" : "en-US"
    );
  };

  const SubscriptionCard = ({
    subscription,
  }: {
    subscription: Subscription;
  }) => {
    const progress =
      (subscription.deliveriesCompleted / subscription.totalDeliveries) * 100;

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
              <Image
                src={subscription.coffee.image}
                alt={t(subscription.coffee.nameKey, language)}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    {subscription.planName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(subscription.coffee.nameKey, language)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${subscription.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      `mySubscriptions.frequencies.${subscription.frequency}`,
                      language
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getStatusBadge(subscription.status)}
                <span className="text-sm text-muted-foreground">
                  {t("mySubscriptions.subscription.startDate", language)}:{" "}
                  {formatDate(subscription.startDate)}
                </span>
              </div>

              {subscription.status === "active" &&
                subscription.nextDelivery && (
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-800">
                        {t(
                          "mySubscriptions.subscription.nextDelivery",
                          language
                        )}
                        : {formatDate(subscription.nextDelivery)}
                      </span>
                    </div>
                  </div>
                )}

              {subscription.status === "paused" && subscription.pauseUntil && (
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <span className="text-sm text-yellow-800">
                    {t("mySubscriptions.subscription.pauseUntil", language)}:{" "}
                    {formatDate(subscription.pauseUntil)}
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t("mySubscriptions.deliveryProgress", language)}</span>
                  <span>
                    {subscription.deliveriesCompleted}/
                    {subscription.totalDeliveries}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="flex gap-2 pt-2">
                {subscription.status === "active" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      {t("mySubscriptions.actions.manage", language)}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4 mr-2" />
                      {t("mySubscriptions.actions.pause", language)}
                    </Button>
                    <Button variant="outline" size="sm">
                      <SkipForward className="h-4 w-4 mr-2" />
                      {t("mySubscriptions.actions.skip", language)}
                    </Button>
                  </>
                )}

                {subscription.status === "paused" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      {t("mySubscriptions.actions.resume", language)}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      {t("mySubscriptions.actions.manage", language)}
                    </Button>
                    <Button variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      {t("mySubscriptions.actions.cancel", language)}
                    </Button>
                  </>
                )}

                {subscription.status === "cancelled" && (
                  <Button variant="outline" size="sm" disabled>
                    {t("mySubscriptions.cancelled", language)}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-12">
      <Coffee className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {t("mySubscriptions.title", language)}
        </h1>
        <Button asChild className="bg-amber-800 hover:bg-amber-900">
          <Link href="/subscriptions">
            <Plus className="h-4 w-4 mr-2" />
            {t("mySubscriptions.createNew", language)}
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active" className="flex items-center gap-2">
            {t("mySubscriptions.active", language)}
            {activeSubscriptions.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeSubscriptions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="paused" className="flex items-center gap-2">
            {t("mySubscriptions.paused", language)}
            {pausedSubscriptions.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {pausedSubscriptions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex items-center gap-2">
            {t("mySubscriptions.cancelled", language)}
            {cancelledSubscriptions.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {cancelledSubscriptions.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeSubscriptions.length === 0 ? (
            <EmptyState
              message={t("mySubscriptions.noSubscriptions", language)}
            />
          ) : (
            <div className="space-y-4">
              {activeSubscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="paused">
          {pausedSubscriptions.length === 0 ? (
            <EmptyState
              message={t("mySubscriptions.emptyStates.paused", language)}
            />
          ) : (
            <div className="space-y-4">
              {pausedSubscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled">
          {cancelledSubscriptions.length === 0 ? (
            <EmptyState
              message={t("mySubscriptions.emptyStates.cancelled", language)}
            />
          ) : (
            <div className="space-y-4">
              {cancelledSubscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Summary Statistics */}
      {subscriptions.length > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {t("mySubscriptions.stats.totalSubscriptions", language)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center text-amber-800">
                {subscriptions.length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {t("mySubscriptions.stats.totalDeliveries", language)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center text-green-600">
                {subscriptions.reduce(
                  (sum, sub) => sum + sub.deliveriesCompleted,
                  0
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {t("mySubscriptions.stats.monthlySavings", language)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center text-blue-600">
                $47.20
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
