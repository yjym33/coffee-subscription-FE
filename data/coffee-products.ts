export interface Coffee {
  id: string;
  nameKey: string;
  descriptionKey: string;
  image: string;
  price: number;
  acidity: "high" | "medium" | "low";
  body: "full" | "medium" | "low";
  caffeine: "regular" | "decaf";
  origin: "single" | "blend";
  available: boolean;
}

export const coffeeProducts: Coffee[] = [
  {
    id: "ethiopian-yirgacheffe",
    nameKey: "products.ethiopianYirgacheffe.name",
    descriptionKey: "products.ethiopianYirgacheffe.description",
    image: "/placeholder.svg?height=300&width=300",
    price: 24.99,
    acidity: "high",
    body: "medium",
    caffeine: "regular",
    origin: "single",
    available: true,
  },
  {
    id: "colombian-supremo",
    nameKey: "products.colombianSupremo.name",
    descriptionKey: "products.colombianSupremo.description",
    image: "/placeholder.svg?height=300&width=300",
    price: 22.99,
    acidity: "medium",
    body: "full",
    caffeine: "regular",
    origin: "single",
    available: true,
  },
  {
    id: "decaf-sumatra",
    nameKey: "products.decafSumatra.name",
    descriptionKey: "products.decafSumatra.description",
    image: "/placeholder.svg?height=300&width=300",
    price: 26.99,
    acidity: "low",
    body: "full",
    caffeine: "decaf",
    origin: "single",
    available: true,
  },
  {
    id: "breakfast-blend",
    nameKey: "products.breakfastBlend.name",
    descriptionKey: "products.breakfastBlend.description",
    image: "/placeholder.svg?height=300&width=300",
    price: 19.99,
    acidity: "medium",
    body: "medium",
    caffeine: "regular",
    origin: "blend",
    available: true,
  },
  {
    id: "costa-rican-tarrazu",
    nameKey: "products.costaRicanTarrazu.name",
    descriptionKey: "products.costaRicanTarrazu.description",
    image: "/placeholder.svg?height=300&width=300",
    price: 17.99,
    acidity: "high",
    body: "medium",
    caffeine: "regular",
    origin: "single",
    available: true,
  },
  {
    id: "guatemalan-antigua",
    nameKey: "products.guatemalanAntigua.name",
    descriptionKey: "products.guatemalanAntigua.description",
    image: "/placeholder.svg?height=300&width=300",
    price: 16.49,
    acidity: "medium",
    body: "full",
    caffeine: "regular",
    origin: "single",
    available: true,
  },
  {
    id: "kenyan-aa",
    nameKey: "products.kenyanAA.name",
    descriptionKey: "products.kenyanAA.description",
    image: "/placeholder.svg?height=300&width=300",
    price: 18.99,
    acidity: "high",
    body: "medium",
    caffeine: "regular",
    origin: "single",
    available: true,
  },
  {
    id: "espresso-blend",
    nameKey: "products.espressoBlend.name",
    descriptionKey: "products.espressoBlend.description",
    image: "/placeholder.svg?height=300&width=300",
    price: 15.49,
    acidity: "low",
    body: "full",
    caffeine: "regular",
    origin: "blend",
    available: true,
  },
];

export const getCoffeeById = (id: string): Coffee | undefined => {
  return coffeeProducts.find((coffee) => coffee.id === id);
};

export const getFeaturedCoffees = (): Coffee[] => {
  return coffeeProducts.slice(0, 4);
};

export const getCoffeesByType = (type: "single" | "blend"): Coffee[] => {
  return coffeeProducts.filter((coffee) => coffee.origin === type);
};

export const getCoffeesByCaffeine = (
  caffeine: "regular" | "decaf"
): Coffee[] => {
  return coffeeProducts.filter((coffee) => coffee.caffeine === caffeine);
};
