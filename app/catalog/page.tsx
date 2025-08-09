"use client";
/**
 * 카탈로그 페이지
 * - 확장된 제품 목록(로스트 레벨 부여)에 대해 필터/정렬/장바구니 담기 기능 제공
 * - 필터 파이프라인: 상태 → 조건별 필터 → 가격대 필터 → 정렬
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ShoppingCart, SlidersHorizontal, X, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/hooks/use-language-store";
import { useCart } from "@/hooks/use-cart-store";
import { t } from "@/lib/translations";
import { coffeeProducts, Coffee } from "@/data/coffee-products";

interface FilterState {
  roastLevel: string[];
  origin: string[];
  caffeine: string[];
  priceRange: [number, number];
  acidity: string[];
  body: string[];
}

// Extended coffee product for catalog
interface CatalogCoffee extends Coffee {
  roastLevel: string;
}

// Sample extended product data with roast levels
const extendedProducts: CatalogCoffee[] = coffeeProducts.map(
  (coffee, index) => {
    const roastLevels = [
      "Light",
      "Medium",
      "Dark",
      "Medium",
      "Medium-Light",
      "Medium-Dark",
      "Medium",
      "Dark",
    ];
    return {
      ...coffee,
      roastLevel: roastLevels[index] || "Medium",
    };
  }
);

export default function CatalogPage() {
  const [filters, setFilters] = useState<FilterState>({
    roastLevel: [],
    origin: [],
    caffeine: [],
    priceRange: [0, 30],
    acidity: [],
    body: [],
  });
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());

  const { language } = useLanguage();
  const { addItem } = useCart();

  const handleAddToCart = (product: CatalogCoffee) => {
    const cartItem = {
      id: product.id,
      nameKey: product.nameKey,
      descriptionKey: product.descriptionKey,
      price: product.price,
      image: product.image,
      acidity: product.acidity,
      body: product.body,
      caffeine: product.caffeine,
    };

    addItem(cartItem);

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

  const handleFilterChange = (
    category: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => {
      if (category === "priceRange") return prev; // Price range is handled separately

      const currentValues = prev[category] as string[];
      if (checked) {
        return {
          ...prev,
          [category]: [...currentValues, value],
        };
      } else {
        return {
          ...prev,
          [category]: currentValues.filter((item) => item !== value),
        };
      }
    });
  };

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [value[0], value[1]] as [number, number],
    }));
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const resetFilters = () => {
    setFilters({
      roastLevel: [],
      origin: [],
      caffeine: [],
      priceRange: [0, 30],
      acidity: [],
      body: [],
    });
  };

  const filteredProducts = extendedProducts
    .filter((product) => {
      // Filter by roast level
      if (
        filters.roastLevel.length > 0 &&
        !filters.roastLevel.includes(product.roastLevel)
      ) {
        return false;
      }

      // Filter by origin
      if (
        filters.origin.length > 0 &&
        !filters.origin.includes(product.origin)
      ) {
        return false;
      }

      // Filter by caffeine
      if (
        filters.caffeine.length > 0 &&
        !filters.caffeine.includes(product.caffeine)
      ) {
        return false;
      }

      // Filter by acidity
      if (
        filters.acidity.length > 0 &&
        !filters.acidity.includes(product.acidity)
      ) {
        return false;
      }

      // Filter by body
      if (filters.body.length > 0 && !filters.body.includes(product.body)) {
        return false;
      }

      // Filter by price range
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-asc":
          return t(a.nameKey, language).localeCompare(t(b.nameKey, language));
        case "name-desc":
          return t(b.nameKey, language).localeCompare(t(a.nameKey, language));
        case "featured":
        default:
          return Number(b.available) - Number(a.available);
      }
    });

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">
          {t("catalog.priceRange", language)}
        </h3>
        <div className="px-3">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            max={30}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">
          {t("catalog.roastLevel", language)}
        </h3>
        <div className="space-y-2">
          {["Light", "Medium-Light", "Medium", "Medium-Dark", "Dark"].map(
            (roast) => (
              <div key={roast} className="flex items-center space-x-2">
                <Checkbox
                  id={`roast-${roast}`}
                  checked={filters.roastLevel.includes(roast)}
                  onCheckedChange={(checked) =>
                    handleFilterChange("roastLevel", roast, Boolean(checked))
                  }
                />
                <Label htmlFor={`roast-${roast}`}>{roast}</Label>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">{t("catalog.origin", language)}</h3>
        <div className="space-y-2">
          {[
            {
              key: "single",
              label: t("products.single", language),
            },
            { key: "blend", label: t("products.blend", language) },
          ].map((origin) => (
            <div key={origin.key} className="flex items-center space-x-2">
              <Checkbox
                id={`origin-${origin.key}`}
                checked={filters.origin.includes(origin.key)}
                onCheckedChange={(checked) =>
                  handleFilterChange("origin", origin.key, Boolean(checked))
                }
              />
              <Label htmlFor={`origin-${origin.key}`}>{origin.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">{t("catalog.caffeine", language)}</h3>
        <div className="space-y-2">
          {[
            { key: "regular", label: t("products.regular", language) },
            { key: "decaf", label: t("products.decaf", language) },
          ].map((caffeine) => (
            <div key={caffeine.key} className="flex items-center space-x-2">
              <Checkbox
                id={`caffeine-${caffeine.key}`}
                checked={filters.caffeine.includes(caffeine.key)}
                onCheckedChange={(checked) =>
                  handleFilterChange("caffeine", caffeine.key, Boolean(checked))
                }
              />
              <Label htmlFor={`caffeine-${caffeine.key}`}>
                {caffeine.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">{t("catalog.acidity", language)}</h3>
        <div className="space-y-2">
          {[
            { key: "low", label: t("products.low", language) },
            { key: "medium", label: t("products.medium", language) },
            { key: "high", label: t("products.high", language) },
          ].map((acidity) => (
            <div key={acidity.key} className="flex items-center space-x-2">
              <Checkbox
                id={`acidity-${acidity.key}`}
                checked={filters.acidity.includes(acidity.key)}
                onCheckedChange={(checked) =>
                  handleFilterChange("acidity", acidity.key, Boolean(checked))
                }
              />
              <Label htmlFor={`acidity-${acidity.key}`}>{acidity.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">{t("catalog.body", language)}</h3>
        <div className="space-y-2">
          {[
            { key: "medium", label: t("products.medium", language) },
            { key: "full", label: t("products.full", language) },
          ].map((body) => (
            <div key={body.key} className="flex items-center space-x-2">
              <Checkbox
                id={`body-${body.key}`}
                checked={filters.body.includes(body.key)}
                onCheckedChange={(checked) =>
                  handleFilterChange("body", body.key, Boolean(checked))
                }
              />
              <Label htmlFor={`body-${body.key}`}>{body.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" onClick={resetFilters} className="w-full">
        {t("catalog.resetFilters", language)}
      </Button>
    </div>
  );

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("catalog.title", language)}
          </h1>
          <p className="text-muted-foreground">
            {t("catalog.description", language)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-by" className="text-sm whitespace-nowrap">
              {t("catalog.sortBy", language)}
            </Label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            >
              <option value="featured">
                {t("catalog.sortOptions.featured", language)}
              </option>
              <option value="price-low">
                {t("catalog.sortOptions.priceLow", language)}
              </option>
              <option value="price-high">
                {t("catalog.sortOptions.priceHigh", language)}
              </option>
              <option value="name-asc">
                {t("catalog.sortOptions.nameAsc", language)}
              </option>
              <option value="name-desc">
                {t("catalog.sortOptions.nameDesc", language)}
              </option>
            </select>
          </div>
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {t("catalog.filters", language)}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>{t("catalog.filters", language)}</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <div className="hidden md:block">
          <FilterSidebar />
        </div>

        <div className="space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">
                {t("catalog.noProducts", language)}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("catalog.adjustFilters", language)}
              </p>
              <Button onClick={resetFilters}>
                {t("catalog.resetFilters", language)}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={t(product.nameKey, language)}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">
                        {t(product.nameKey, language)}
                      </h3>
                      <span className="font-medium text-amber-800">
                        ${product.price}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t(product.descriptionKey, language)}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.roastLevel}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {t(`products.${product.acidity}`, language)}{" "}
                        {t("products.acidity", language)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {t(`products.${product.body}`, language)}{" "}
                        {t("products.body", language)}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
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
          )}
        </div>
      </div>
    </div>
  );
}
