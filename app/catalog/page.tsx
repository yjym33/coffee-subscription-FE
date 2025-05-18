"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ShoppingCart, SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Sample product data
const products = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description: "Bright, floral notes with citrus acidity",
    price: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    acidity: "High",
    body: "Medium",
    caffeine: "Regular",
    origin: "Single Origin",
    roastLevel: "Light",
    featured: true,
  },
  {
    id: 2,
    name: "Colombian Supremo",
    description: "Sweet caramel with nutty undertones",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    acidity: "Medium",
    body: "Full",
    caffeine: "Regular",
    origin: "Single Origin",
    roastLevel: "Medium",
    featured: true,
  },
  {
    id: 3,
    name: "Decaf Sumatra",
    description: "Earthy, herbal with low acidity",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    acidity: "Low",
    body: "Full",
    caffeine: "Decaf",
    origin: "Single Origin",
    roastLevel: "Dark",
    featured: true,
  },
  {
    id: 4,
    name: "Breakfast Blend",
    description: "Balanced, smooth with chocolate notes",
    price: 13.99,
    image: "/placeholder.svg?height=300&width=300",
    acidity: "Medium",
    body: "Medium",
    caffeine: "Regular",
    origin: "Blend",
    roastLevel: "Medium",
    featured: true,
  },
  {
    id: 5,
    name: "Costa Rican Tarrazu",
    description: "Bright acidity with honey sweetness",
    price: 17.99,
    image: "/placeholder.svg?height=300&width=300",
    acidity: "High",
    body: "Medium",
    caffeine: "Regular",
    origin: "Single Origin",
    roastLevel: "Medium-Light",
    featured: false,
  },
  {
    id: 6,
    name: "Guatemalan Antigua",
    description: "Spicy, smoky with chocolate finish",
    price: 16.49,
    image: "/placeholder.svg?height=300&width=300",
    acidity: "Medium",
    body: "Full",
    caffeine: "Regular",
    origin: "Single Origin",
    roastLevel: "Medium-Dark",
    featured: false,
  },
  {
    id: 7,
    name: "Kenyan AA",
    description: "Bold, wine-like acidity with berry notes",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    acidity: "High",
    body: "Medium",
    caffeine: "Regular",
    origin: "Single Origin",
    roastLevel: "Medium",
    featured: false,
  },
  {
    id: 8,
    name: "Espresso Blend",
    description: "Rich, balanced with caramel sweetness",
    price: 15.49,
    image: "/placeholder.svg?height=300&width=300",
    acidity: "Low",
    body: "Full",
    caffeine: "Regular",
    origin: "Blend",
    roastLevel: "Dark",
    featured: false,
  },
]

export default function CatalogPage() {
  const [filters, setFilters] = useState({
    roastLevel: [],
    origin: [],
    caffeine: [],
    priceRange: [0, 30],
    acidity: [],
    body: [],
  })
  const [sortBy, setSortBy] = useState("featured")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleFilterChange = (category, value, checked) => {
    setFilters((prev) => {
      if (checked) {
        return {
          ...prev,
          [category]: [...prev[category], value],
        }
      } else {
        return {
          ...prev,
          [category]: prev[category].filter((item) => item !== value),
        }
      }
    })
  }

  const handlePriceChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: value,
    }))
  }

  const handleSortChange = (value) => {
    setSortBy(value)
  }

  const resetFilters = () => {
    setFilters({
      roastLevel: [],
      origin: [],
      caffeine: [],
      priceRange: [0, 30],
      acidity: [],
      body: [],
    })
  }

  const filteredProducts = products
    .filter((product) => {
      // Filter by roast level
      if (filters.roastLevel.length > 0 && !filters.roastLevel.includes(product.roastLevel)) {
        return false
      }

      // Filter by origin
      if (filters.origin.length > 0 && !filters.origin.includes(product.origin)) {
        return false
      }

      // Filter by caffeine
      if (filters.caffeine.length > 0 && !filters.caffeine.includes(product.caffeine)) {
        return false
      }

      // Filter by acidity
      if (filters.acidity.length > 0 && !filters.acidity.includes(product.acidity)) {
        return false
      }

      // Filter by body
      if (filters.body.length > 0 && !filters.body.includes(product.body)) {
        return false
      }

      // Filter by price range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return b.featured - a.featured
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>${filters.priceRange[0].toFixed(2)}</span>
            <span>${filters.priceRange[1].toFixed(2)}</span>
          </div>
          <Slider value={filters.priceRange} min={0} max={30} step={0.5} onValueChange={handlePriceChange} />
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Roast Level</h3>
        <div className="space-y-2">
          {["Light", "Medium", "Medium-Dark", "Dark"].map((roast) => (
            <div key={roast} className="flex items-center space-x-2">
              <Checkbox
                id={`roast-${roast}`}
                checked={filters.roastLevel.includes(roast)}
                onCheckedChange={(checked) => handleFilterChange("roastLevel", roast, checked)}
              />
              <Label htmlFor={`roast-${roast}`}>{roast}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Origin</h3>
        <div className="space-y-2">
          {["Single Origin", "Blend"].map((origin) => (
            <div key={origin} className="flex items-center space-x-2">
              <Checkbox
                id={`origin-${origin}`}
                checked={filters.origin.includes(origin)}
                onCheckedChange={(checked) => handleFilterChange("origin", origin, checked)}
              />
              <Label htmlFor={`origin-${origin}`}>{origin}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Caffeine</h3>
        <div className="space-y-2">
          {["Regular", "Decaf"].map((caffeine) => (
            <div key={caffeine} className="flex items-center space-x-2">
              <Checkbox
                id={`caffeine-${caffeine}`}
                checked={filters.caffeine.includes(caffeine)}
                onCheckedChange={(checked) => handleFilterChange("caffeine", caffeine, checked)}
              />
              <Label htmlFor={`caffeine-${caffeine}`}>{caffeine}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Acidity</h3>
        <div className="space-y-2">
          {["Low", "Medium", "High"].map((acidity) => (
            <div key={acidity} className="flex items-center space-x-2">
              <Checkbox
                id={`acidity-${acidity}`}
                checked={filters.acidity.includes(acidity)}
                onCheckedChange={(checked) => handleFilterChange("acidity", acidity, checked)}
              />
              <Label htmlFor={`acidity-${acidity}`}>{acidity}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Body</h3>
        <div className="space-y-2">
          {["Light", "Medium", "Full"].map((body) => (
            <div key={body} className="flex items-center space-x-2">
              <Checkbox
                id={`body-${body}`}
                checked={filters.body.includes(body)}
                onCheckedChange={(checked) => handleFilterChange("body", body, checked)}
              />
              <Label htmlFor={`body-${body}`}>{body}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" onClick={resetFilters} className="w-full">
        Reset Filters
      </Button>
    </div>
  )

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coffee Catalog</h1>
          <p className="text-muted-foreground">Discover our selection of premium coffee beans</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-by" className="text-sm whitespace-nowrap">
              Sort by:
            </Label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
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
          {Object.values(filters).some(
            (filter) =>
              (Array.isArray(filter) && filter.length > 0) ||
              (Array.isArray(filter) && filter.length === 2 && (filter[0] > 0 || filter[1] < 30)),
          ) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium">Active filters:</span>
              {filters.roastLevel.map((roast) => (
                <Badge key={`badge-roast-${roast}`} variant="secondary" className="flex items-center gap-1">
                  {roast}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleFilterChange("roastLevel", roast, false)}
                  />
                </Badge>
              ))}
              {filters.origin.map((origin) => (
                <Badge key={`badge-origin-${origin}`} variant="secondary" className="flex items-center gap-1">
                  {origin}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("origin", origin, false)} />
                </Badge>
              ))}
              {filters.caffeine.map((caffeine) => (
                <Badge key={`badge-caffeine-${caffeine}`} variant="secondary" className="flex items-center gap-1">
                  {caffeine}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleFilterChange("caffeine", caffeine, false)}
                  />
                </Badge>
              ))}
              {filters.acidity.map((acidity) => (
                <Badge key={`badge-acidity-${acidity}`} variant="secondary" className="flex items-center gap-1">
                  {acidity} Acidity
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("acidity", acidity, false)} />
                </Badge>
              ))}
              {filters.body.map((body) => (
                <Badge key={`badge-body-${body}`} variant="secondary" className="flex items-center gap-1">
                  {body} Body
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("body", body, false)} />
                </Badge>
              ))}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 30) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  ${filters.priceRange[0].toFixed(2)} - ${filters.priceRange[1].toFixed(2)}
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7">
                Clear all
              </Button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products match your filters</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filter criteria</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{product.name}</h3>
                      <span className="font-medium text-amber-800">${product.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.roastLevel}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {product.acidity} Acidity
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {product.body} Body
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/product/${product.id}`}>Details</Link>
                    </Button>
                    <Button size="sm" className="flex-1 bg-amber-800 hover:bg-amber-900">
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
