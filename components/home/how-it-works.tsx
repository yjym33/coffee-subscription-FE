"use client";

import { CheckCircle, Coffee, Truck, UserCircle } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/translations";

export default function HowItWorks() {
  const { language } = useLanguage();

  return (
    <section className="container px-4 md:px-6">
      <div className="flex flex-col gap-2 text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("howItWorks.title", language)}
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px]">
          {t("howItWorks.description", language)}
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-4">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <UserCircle className="h-8 w-8 text-amber-800" />
          </div>
          <h3 className="text-xl font-semibold">
            {t("howItWorks.steps.profile.title", language)}
          </h3>
          <p className="text-muted-foreground">
            {t("howItWorks.steps.profile.description", language)}
          </p>
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <Coffee className="h-8 w-8 text-amber-800" />
          </div>
          <h3 className="text-xl font-semibold">
            {t("howItWorks.steps.recommendations.title", language)}
          </h3>
          <p className="text-muted-foreground">
            {t("howItWorks.steps.recommendations.description", language)}
          </p>
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <CheckCircle className="h-8 w-8 text-amber-800" />
          </div>
          <h3 className="text-xl font-semibold">
            {t("howItWorks.steps.schedule.title", language)}
          </h3>
          <p className="text-muted-foreground">
            {t("howItWorks.steps.schedule.description", language)}
          </p>
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <Truck className="h-8 w-8 text-amber-800" />
          </div>
          <h3 className="text-xl font-semibold">
            {t("howItWorks.steps.enjoy.title", language)}
          </h3>
          <p className="text-muted-foreground">
            {t("howItWorks.steps.enjoy.description", language)}
          </p>
        </div>
      </div>
    </section>
  );
}
