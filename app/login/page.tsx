"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Coffee } from "lucide-react";
import { useLanguage } from "@/hooks/use-language-store";
import { t } from "@/lib/translations";

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    // TODO: Implement authentication logic
    // Redirect to dashboard or home page on successful login
    router.push("/");
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-10">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 mb-4">
            <Coffee className="h-6 w-6 text-amber-800" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {t("login.title", language)}
          </CardTitle>
          <CardDescription>{t("login.description", language)}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("login.email", language)}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  {t("login.password", language)}
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-amber-800 hover:text-amber-900"
                >
                  {t("login.forgotPassword", language)}
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full">
              {t("header.signIn", language)}
            </Button>
            <div className="text-center text-sm">
              {t("login.noAccount", language)}{" "}
              <Link
                href="/register"
                className="text-amber-800 hover:text-amber-900"
              >
                {t("header.createAccount", language)}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
