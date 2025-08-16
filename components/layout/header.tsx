"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Coffee, Menu, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../common/mode-toggle";
import { LanguageToggle } from "../common/language-toggle";
import { useLanguage } from "@/hooks/use-language-store";
import { useCart } from "@/hooks/use-cart-store";
import { useAuthStore } from "@/store/auth-store";
import { t } from "@/lib/translations";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguage();
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuthStore();

  const routes = [
    { href: "/", label: t("header.home", language) },
    { href: "/catalog", label: t("header.shop", language) },
    { href: "/subscriptions", label: t("header.subscriptions", language) },
    { href: "/about", label: t("header.about", language) },
  ];

  const cartItemsCount = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-4">
                {routes.map((route) => (
                  <Button
                    key={route.href}
                    asChild
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={route.href}>{route.label}</Link>
                  </Button>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  {isAuthenticated ? (
                    <>
                      <div className="text-sm text-muted-foreground px-3 py-2">
                        {t("header.welcome", language)} {user?.name}
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/my-account">
                          {t("header.myAccount", language)}
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={logout}
                      >
                        {t("header.signOut", language)}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="default" className="w-full">
                        <Link href="/login">
                          {t("header.signIn", language)}
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/register">
                          {t("header.createAccount", language)}
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-amber-700 dark:text-amber-300" />
            <span className="font-bold text-xl hidden sm:inline-block text-foreground">
              Bean Bliss
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ModeToggle />
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-amber-700 dark:bg-amber-600 hover:bg-amber-800 dark:hover:bg-amber-700 text-white"
                >
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </Badge>
              )}
              <span className="sr-only">{t("header.cart", language)}</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    {user?.name}
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/my-account">
                      {t("header.myAccount", language)}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-subscriptions">
                      {t("header.mySubscriptions", language)}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    {t("header.signOut", language)}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">{t("header.signIn", language)}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">
                      {t("header.createAccount", language)}
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
