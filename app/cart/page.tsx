"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/translations";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } =
    useCart();
  const { language } = useLanguage();

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 50 ? 0 : 5.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const EmptyCart = () => (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-md mx-auto text-center">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-amber-100 rounded-full">
              <ShoppingBag className="h-12 w-12 text-amber-800" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {t("cart.empty.title", language)}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t("cart.empty.description", language)}
          </p>
          <Button asChild className="bg-amber-800 hover:bg-amber-900">
            <Link href="/catalog">{t("cart.empty.shopNow", language)}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/catalog">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{t("cart.title", language)}</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-muted-foreground">
            {t("cart.itemsInCart", language).replace(
              "{count}",
              getTotalItems().toString()
            )}
          </p>

          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={t(item.nameKey, language)}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {t(item.nameKey, language)}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {t(item.descriptionKey, language)}
                        </p>
                        <div className="flex gap-1 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {t(`products.${item.acidity}`, language)}{" "}
                            {t("products.acidity", language)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {t(`products.${item.body}`, language)}{" "}
                            {t("products.body", language)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {t(`products.${item.caffeine}`, language)}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-lg">${item.price}</p>
                        <p className="text-sm text-muted-foreground">
                          {t("cart.item.price", language)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-16 h-8 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm text-muted-foreground ml-2">
                          {t("cart.item.quantity", language)}
                        </span>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t("cart.item.remove", language)}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>{t("cart.summary.title", language)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>{t("cart.summary.subtotal", language)}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>{t("cart.summary.shipping", language)}</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">
                      {t("cart.summary.freeShipping", language)}
                    </span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>{t("cart.summary.tax", language)}</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>{t("cart.summary.total", language)}</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button
                className="w-full bg-amber-800 hover:bg-amber-900"
                size="lg"
              >
                {t("cart.checkout", language)}
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/catalog">
                  {t("cart.continueShopping", language)}
                </Link>
              </Button>

              {shipping > 0 && (
                <p className="text-sm text-muted-foreground text-center">
                  💡{" "}
                  {subtotal >= 50
                    ? ""
                    : t("cart.freeShippingNotice", language).replace(
                        "{amount}",
                        `$${(50 - subtotal).toFixed(2)}`
                      )}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
