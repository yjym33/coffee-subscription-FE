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
import { useAuthStore } from "@/store/auth-store";
import { t } from "@/lib/translations";

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(formData.email, formData.password);
      // 로그인 성공 시 홈페이지로 리다이렉트
      router.push("/");
    } catch (error) {
      // 로그인 실패 시 에러 메시지 표시
      setError(
        error instanceof Error ? error.message : "로그인에 실패했습니다."
      );
    }
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
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? t("login.signingIn", language) || "로그인 중..."
                : t("header.signIn", language)}
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
