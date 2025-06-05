"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/translations";

export default function TestimonialSection() {
  const { language } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: t("testimonials.customers.customer1.name", language),
      role: t("testimonials.customers.customer1.role", language),
      content: t("testimonials.customers.customer1.content", language),
      rating: 5,
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: t("testimonials.customers.customer2.name", language),
      role: t("testimonials.customers.customer2.role", language),
      content: t("testimonials.customers.customer2.content", language),
      rating: 5,
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: t("testimonials.customers.customer3.name", language),
      role: t("testimonials.customers.customer3.role", language),
      content: t("testimonials.customers.customer3.content", language),
      rating: 4,
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <section className="bg-muted/30 py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("testimonials.title", language)}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-[700px]">
            {t("testimonials.description", language)}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
