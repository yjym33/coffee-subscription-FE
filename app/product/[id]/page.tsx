"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Check,
  ArrowLeft,
  Star,
  Coffee,
  Thermometer,
  Clock,
  Droplets,
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useCart } from "@/hooks/use-cart";
import { t } from "@/lib/translations";
import { getCoffeeById, getFeaturedCoffees } from "@/data/coffee-products";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { language } = useLanguage();
  const { addItem } = useCart();

  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Get the specific coffee product
  const product = getCoffeeById(productId);

  // Get related products (excluding current product)
  const relatedProducts = getFeaturedCoffees()
    .filter((p) => p.id !== productId)
    .slice(0, 3);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {t("product.notFound", language)}
        </h1>
        <Link href="/catalog">
          <Button>{t("product.backToCatalog", language)}</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
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
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const brewingSteps = [
    {
      icon: Coffee,
      title: "product.brewing.grind",
      description: "product.brewing.grindDesc",
    },
    {
      icon: Thermometer,
      title: "product.brewing.water",
      description: "product.brewing.waterDesc",
    },
    {
      icon: Clock,
      title: "product.brewing.time",
      description: "product.brewing.timeDesc",
    },
    {
      icon: Droplets,
      title: "product.brewing.enjoy",
      description: "product.brewing.enjoyDesc",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/catalog">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t("product.backToCatalog", language)}
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={t(product.nameKey, language)}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {t(product.nameKey, language)}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {t(product.descriptionKey, language)}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                (4.8) · 256 {t("product.reviews", language)}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-amber-800">
            ${product.price}
          </div>

          {/* Characteristics */}
          <div className="space-y-3">
            <h3 className="font-semibold">
              {t("product.characteristics", language)}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("products.acidity", language)}:
                </span>
                <Badge variant="outline">
                  {t(`products.${product.acidity}`, language)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("products.body", language)}:
                </span>
                <Badge variant="outline">
                  {t(`products.${product.body}`, language)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("product.caffeine", language)}:
                </span>
                <Badge variant="outline">
                  {t(`products.${product.caffeine}`, language)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("product.origin", language)}:
                </span>
                <Badge variant="outline">
                  {t(`products.${product.origin}`, language)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">
                {t("product.quantity", language)}:
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <Button
              className={`w-full ${
                isAdded
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-amber-800 hover:bg-amber-900"
              }`}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {t("products.added", language)}
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t("product.addToCart", language)} · $
                  {(product.price * quantity).toFixed(2)}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Brewing Guide */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {t("product.brewingGuide", language)}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brewingSteps.map((step, index) => (
            <Card key={index}>
              <CardHeader className="text-center">
                <step.icon className="h-8 w-8 mx-auto mb-2 text-amber-800" />
                <CardTitle className="text-lg">
                  {t(step.title, language)}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  {t(step.description, language)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-12" />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {t("product.relatedProducts", language)}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={relatedProduct.image}
                    alt={t(relatedProduct.nameKey, language)}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">
                    {t(relatedProduct.nameKey, language)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t(relatedProduct.descriptionKey, language)}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-amber-800">
                      ${relatedProduct.price}
                    </span>
                    <Link href={`/product/${relatedProduct.id}`}>
                      <Button variant="outline" size="sm">
                        {t("products.details", language)}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
