"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Check } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useCart } from "@/hooks/use-cart";
import { t } from "@/lib/translations";
import { getFeaturedCoffees, Coffee } from "@/data/coffee-products";

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
  const { language } = useLanguage();
  const { addItem } = useCart();

  const products = getFeaturedCoffees();

  const handleAddToCart = (product: Coffee) => {
    addItem({
      id: product.id,
      nameKey: product.nameKey,
      descriptionKey: product.descriptionKey,
      price: product.price,
      image: product.image,
      acidity: product.acidity,
      body: product.body,
      caffeine: product.caffeine,
    });

    // Show added state temporarily
    setAddedProducts((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden transition-all duration-200 hover:shadow-md"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={t(product.nameKey, language)}
              fill
              className="object-cover transition-transform duration-300 ease-in-out"
              style={{
                transform:
                  hoveredProduct === product.id ? "scale(1.05)" : "scale(1)",
              }}
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{t(product.nameKey, language)}</h3>
              <span className="font-medium text-amber-800">
                ${product.price}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {t(product.descriptionKey, language)}
            </p>
            <div className="flex flex-wrap gap-1 mb-2">
              <Badge variant="outline" className="text-xs">
                {t(`products.${product.acidity}`, language)}{" "}
                {t("products.acidity", language)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {t(`products.${product.body}`, language)}{" "}
                {t("products.body", language)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {t(`products.${product.caffeine}`, language)}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/product/${product.id}`}>
                {t("products.details", language)}
              </Link>
            </Button>
            <Button
              size="sm"
              className={`flex-1 transition-colors ${
                addedProducts.has(product.id)
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-amber-800 hover:bg-amber-900"
              }`}
              onClick={() => handleAddToCart(product)}
              disabled={addedProducts.has(product.id)}
            >
              {addedProducts.has(product.id) ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {t("products.added", language)}
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t("products.add", language)}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
