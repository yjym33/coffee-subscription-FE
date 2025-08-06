"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coffee } from "lucide-react";
import { useLanguage } from "@/hooks/use-language-store";
import { t } from "@/lib/translations";

export default function RegisterPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
  };
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  type Errors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
  };
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreeTerms: checked,
    }));
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("register.error.firstNameRequired", language);
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t("register.error.lastNameRequired", language);
    }

    if (!formData.email.trim()) {
      newErrors.email = t("register.error.emailRequired", language);
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("register.error.emailInvalid", language);
    }

    if (!formData.password) {
      newErrors.password = t("register.error.passwordRequired", language);
    } else if (formData.password.length < 8) {
      newErrors.password = t("register.error.passwordLength", language);
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("register.error.passwordMatch", language);
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = t("register.error.agreeTerms", language);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/taste-profile");
    }, 1500);
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-10">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 mb-4">
            <Coffee className="h-6 w-6 text-amber-800" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {t("register.createAccount", language)}
          </CardTitle>
          <CardDescription>{t("register.joinDesc", language)}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {t("register.firstName", language)}
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder={t("register.firstName", language)}
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {t("register.lastName", language)}
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder={t("register.lastName", language)}
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("register.email", language)}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("register.email", language)}
                required
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                {t("register.password", language)}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("register.confirmPassword", language)}
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                {t("register.agreeTerms", language)}{" "}
                <Link
                  href="/terms"
                  className="text-amber-800 hover:text-amber-900"
                >
                  {t("register.termsOfService", language)}
                </Link>{" "}
                {t("register.and", language)}{" "}
                <Link
                  href="/privacy"
                  className="text-amber-800 hover:text-amber-900"
                >
                  {t("register.privacyPolicy", language)}
                </Link>
              </Label>
            </div>
            {errors.agreeTerms && (
              <p className="text-sm text-red-500">{errors.agreeTerms}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-amber-800 hover:bg-amber-900"
              disabled={isLoading}
            >
              {isLoading
                ? t("register.creatingAccount", language)
                : t("register.createAccount", language)}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            {t("register.alreadyHaveAccount", language)}
            <Link href="/login" className="text-amber-800 hover:text-amber-900">
              {t("register.signIn", language)}
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t("register.orContinueWith", language)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">Google</Button>
            <Button variant="outline">Facebook</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
