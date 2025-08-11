"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/use-language-store";
import { t, Language } from "@/lib/translations";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Package,
} from "lucide-react";

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Ethiopian Yirgacheffe",
    nameKo: "에티오피아 예가체프",
    category: "Single Origin",
    price: 35000,
    stock: 45,
    status: "active",
    roastLevel: "Medium",
    description: "Bright and floral with citrus notes",
    image: "/coffee-1.jpg",
  },
  {
    id: "2",
    name: "Colombian Huila",
    nameKo: "콜롬비아 우일라",
    category: "Single Origin",
    price: 42000,
    stock: 23,
    status: "active",
    roastLevel: "Medium-Dark",
    description: "Rich chocolate and caramel flavors",
    image: "/coffee-2.jpg",
  },
  {
    id: "3",
    name: "Brazilian Santos",
    nameKo: "브라질 산토스",
    category: "Single Origin",
    price: 38000,
    stock: 0,
    status: "out_of_stock",
    roastLevel: "Dark",
    description: "Nutty and smooth with low acidity",
    image: "/coffee-3.jpg",
  },
  {
    id: "4",
    name: "House Blend",
    nameKo: "하우스 블렌드",
    category: "Blend",
    price: 32000,
    stock: 67,
    status: "active",
    roastLevel: "Medium",
    description: "Perfect balance of flavor and aroma",
    image: "/coffee-4.jpg",
  },
];

function getStatusBadge(status: string, language: Language) {
  const statusConfig = {
    active: {
      variant: "default" as const,
      label: t("admin.products.status.active", language),
    },
    inactive: {
      variant: "secondary" as const,
      label: t("admin.products.status.inactive", language),
    },
    out_of_stock: {
      variant: "destructive" as const,
      label: t("admin.products.status.outOfStock", language),
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export default function AdminProducts() {
  const { language } = useLanguage();
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productToDelete, setProductToDelete] = useState<any>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    nameKo: "",
    category: "",
    price: "",
    stock: "",
    roastLevel: "",
    description: "",
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameKo.includes(searchQuery);
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    // Add new product to the list
    const newId = (products.length + 1).toString();
    const productData = {
      id: newId,
      name: newProduct.name,
      nameKo: newProduct.nameKo,
      category: newProduct.category,
      price: parseInt(newProduct.price),
      stock: parseInt(newProduct.stock),
      roastLevel: newProduct.roastLevel,
      description: newProduct.description,
      status: parseInt(newProduct.stock) > 0 ? "active" : "out_of_stock",
      image: "/coffee-placeholder.jpg",
    };

    setProducts([...products, productData]);
    setIsAddDialogOpen(false);
    setNewProduct({
      name: "",
      nameKo: "",
      category: "",
      price: "",
      stock: "",
      roastLevel: "",
      description: "",
    });
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedProduct) {
      setProducts(
        products.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))
      );
    }
    setIsEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
    }
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const ProductForm = ({ product, isEdit = false }: any) => {
    const formData = isEdit ? selectedProduct : newProduct;

    const updateField = (field: string, value: any) => {
      if (isEdit) {
        setSelectedProduct({ ...selectedProduct, [field]: value });
      } else {
        setNewProduct({ ...newProduct, [field]: value });
      }
    };

    return (
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">
              {t("admin.products.form.name", language)}
            </Label>
            <Input
              id="name"
              value={isEdit ? formData?.name || "" : formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder={t("admin.products.form.namePlaceholder", language)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nameKo">
              {t("admin.products.form.nameKo", language)}
            </Label>
            <Input
              id="nameKo"
              value={isEdit ? formData?.nameKo || "" : formData.nameKo}
              onChange={(e) => updateField("nameKo", e.target.value)}
              placeholder={t("admin.products.form.nameKoPlaceholder", language)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">
              {t("admin.products.form.category", language)}
            </Label>
            <Select
              value={isEdit ? formData?.category || "" : formData.category}
              onValueChange={(value) => updateField("category", value)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={t(
                    "admin.products.form.selectCategory",
                    language
                  )}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single Origin">Single Origin</SelectItem>
                <SelectItem value="Blend">Blend</SelectItem>
                <SelectItem value="Decaf">Decaf</SelectItem>
                <SelectItem value="Espresso">Espresso</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="roastLevel">
              {t("admin.products.form.roastLevel", language)}
            </Label>
            <Select
              value={isEdit ? formData?.roastLevel || "" : formData.roastLevel}
              onValueChange={(value) => updateField("roastLevel", value)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={t("admin.products.form.selectRoast", language)}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Light">Light</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Medium-Dark">Medium-Dark</SelectItem>
                <SelectItem value="Dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price">
              {t("admin.products.form.price", language)}
            </Label>
            <Input
              id="price"
              type="number"
              value={isEdit ? formData?.price || "" : formData.price}
              onChange={(e) => updateField("price", e.target.value)}
              placeholder="35000"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock">
              {t("admin.products.form.stock", language)}
            </Label>
            <Input
              id="stock"
              type="number"
              value={isEdit ? formData?.stock || "" : formData.stock}
              onChange={(e) => updateField("stock", e.target.value)}
              placeholder="50"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">
            {t("admin.products.form.description", language)}
          </Label>
          <Textarea
            id="description"
            value={isEdit ? formData?.description || "" : formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder={t(
              "admin.products.form.descriptionPlaceholder",
              language
            )}
            rows={3}
          />
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t("admin.products.title", language)}
            </h1>
            <p className="text-muted-foreground">
              {t("admin.products.subtitle", language)}
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t("admin.products.addProduct", language)}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {t("admin.products.addProduct", language)}
                </DialogTitle>
                <DialogDescription>
                  {t("admin.products.addProductDescription", language)}
                </DialogDescription>
              </DialogHeader>
              <ProductForm product={null} isEdit={false} />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  {t("admin.common.cancel", language)}
                </Button>
                <Button onClick={handleAddProduct}>
                  {t("admin.common.save", language)}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("admin.products.searchPlaceholder", language)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("admin.products.filter.all", language)}
              </SelectItem>
              <SelectItem value="Single Origin">Single Origin</SelectItem>
              <SelectItem value="Blend">Blend</SelectItem>
              <SelectItem value="Decaf">Decaf</SelectItem>
              <SelectItem value="Espresso">Espresso</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {t("admin.products.table.product", language)}
                </TableHead>
                <TableHead>
                  {t("admin.products.table.category", language)}
                </TableHead>
                <TableHead>
                  {t("admin.products.table.price", language)}
                </TableHead>
                <TableHead>
                  {t("admin.products.table.stock", language)}
                </TableHead>
                <TableHead>
                  {t("admin.products.table.status", language)}
                </TableHead>
                <TableHead className="text-right">
                  {t("admin.products.table.actions", language)}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {language === "ko" ? product.nameKo : product.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {product.roastLevel}{" "}
                          {t("admin.products.roast", language)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₩{product.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={product.stock === 0 ? "text-red-500" : ""}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(product.status, language)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {t("admin.products.editProduct", language)}
              </DialogTitle>
              <DialogDescription>
                {t("admin.products.editProductDescription", language)}
              </DialogDescription>
            </DialogHeader>
            <ProductForm product={selectedProduct} isEdit={true} />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedProduct(null);
                }}
              >
                {t("admin.common.cancel", language)}
              </Button>
              <Button onClick={handleSaveEdit}>
                {t("admin.common.save", language)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {t("admin.products.deleteProduct", language)}
            </DialogTitle>
            <DialogDescription>
              {t("admin.products.deleteProductDescription", language)}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setProductToDelete(null);
              }}
            >
              {t("admin.common.cancel", language)}
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              {t("admin.products.deleteProduct", language)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
