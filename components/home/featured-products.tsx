"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

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
    featured: true,
  },
]

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

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
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 ease-in-out"
              style={{
                transform: hoveredProduct === product.id ? "scale(1.05)" : "scale(1)",
              }}
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
                {product.acidity} Acidity
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.body} Body
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.caffeine}
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
  )
}
