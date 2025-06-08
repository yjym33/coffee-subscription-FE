"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Coffee,
  Heart,
  Users,
  Award,
  Target,
  Leaf,
  Globe,
  Star,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/translations";

export default function AboutUsPage() {
  const { language } = useLanguage();

  const values = [
    {
      icon: Target,
      titleKey: "about.values.personalization.title",
      descriptionKey: "about.values.personalization.description",
    },
    {
      icon: Award,
      titleKey: "about.values.quality.title",
      descriptionKey: "about.values.quality.description",
    },
    {
      icon: Coffee,
      titleKey: "about.values.convenience.title",
      descriptionKey: "about.values.convenience.description",
    },
    {
      icon: Leaf,
      titleKey: "about.values.sustainability.title",
      descriptionKey: "about.values.sustainability.description",
    },
  ];

  const stats = [
    { icon: Users, number: "10,000+", labelKey: "about.stats.customers" },
    { icon: Coffee, number: "50+", labelKey: "about.stats.coffeeTypes" },
    { icon: Globe, number: "15+", labelKey: "about.stats.countries" },
    { icon: Star, number: "4.8", labelKey: "about.stats.rating" },
  ];

  const features = [
    "about.features.aiRecommendation",
    "about.features.freshRoasting",
    "about.features.flexibleSubscription",
    "about.features.expertCuration",
    "about.features.sustainableSourcing",
    "about.features.customerSupport",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700"
              >
                {t("about.badge", language)}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {t("about.hero.title", language)}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t("about.hero.description", language)}
              </p>
            </div>
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Coffee beans and brewing"
                  fill
                  className="object-cover rounded-2xl shadow-2xl border border-border"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-none shadow-none bg-card"
              >
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-amber-600 dark:text-amber-400" />
                  <div className="text-3xl font-bold text-amber-700 dark:text-amber-300 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t(stat.labelKey, language)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                {t("about.mission.title", language)}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.mission.description", language)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t("about.values.title", language)}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("about.values.subtitle", language)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow bg-card border-border"
              >
                <CardHeader>
                  <value.icon className="h-12 w-12 mx-auto mb-4 text-amber-600 dark:text-amber-400" />
                  <CardTitle className="text-xl text-foreground">
                    {t(value.titleKey, language)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(value.descriptionKey, language)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-amber-50 dark:bg-amber-950/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  {t("about.features.title", language)}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {t("about.features.subtitle", language)}
                </p>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {t(feature, language)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-border">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Coffee roasting"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border">
                    <Image
                      src="/placeholder.svg?height=150&width=200"
                      alt="Coffee packaging"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border">
                    <Image
                      src="/placeholder.svg?height=150&width=200"
                      alt="Coffee tasting"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-border">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Coffee delivery"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative mb-8">
              <Heart className="h-16 w-16 mx-auto text-amber-600 dark:text-amber-400 mb-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              {t("about.promise.title", language)}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("about.promise.description", language)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
