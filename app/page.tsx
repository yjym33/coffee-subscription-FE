"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Coffee, Gift, Truck } from "lucide-react";
import FeaturedProducts from "@/components/home/featured-products";
import TestimonialSection from "@/components/home/testimonial-section";
import HowItWorks from "@/components/home/how-it-works";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/translations";

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-[#f8f3e9] py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                  {t("hero.badge", language)}
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {t("hero.title", language)}
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  {t("hero.description", language)}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-800 hover:bg-amber-900"
                >
                  <Link href="/taste-profile">
                    {t("hero.findMatch", language)}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/catalog">
                    {t("hero.browseCatalog", language)}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Coffee beans and brewing equipment"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-none shadow-sm bg-amber-50">
            <CardHeader className="pb-2">
              <Coffee className="h-12 w-12 text-amber-800" />
              <CardTitle className="text-xl">
                {t("features.personalizedSelection.title", language)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {t("features.personalizedSelection.description", language)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-amber-50">
            <CardHeader className="pb-2">
              <Truck className="h-12 w-12 text-amber-800" />
              <CardTitle className="text-xl">
                {t("features.flexibleDelivery.title", language)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {t("features.flexibleDelivery.description", language)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-amber-50">
            <CardHeader className="pb-2">
              <Gift className="h-12 w-12 text-amber-800" />
              <CardTitle className="text-xl">
                {t("features.alwaysFresh.title", language)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {t("features.alwaysFresh.description", language)}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Featured Products */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("featuredProducts.title", language)}
          </h2>
          <p className="text-gray-500">
            {t("featuredProducts.description", language)}
          </p>
        </div>
        <FeaturedProducts />
        <div className="flex justify-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/catalog" className="flex items-center gap-2">
              {t("featuredProducts.viewAll", language)}{" "}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="bg-amber-800 text-white py-16">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            {t("cta.title", language)}
          </h2>
          <p className="max-w-[600px] mx-auto mb-8 text-amber-100">
            {t("cta.description", language)}
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/register">{t("cta.createAccount", language)}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
