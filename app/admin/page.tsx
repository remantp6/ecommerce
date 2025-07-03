"use client";

import { Plus, Edit, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProduct } from "@/hooks/product-hook/useCreateProduct";
import { toast } from "sonner";
import { useCategoriesList } from "@/hooks/product-hook/useCategoriesList";
import { useAddCategory } from "@/hooks/product-hook/useAddCategories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryFormData,
  categorySchema,
} from "@/lib/validations/add-category";
import { ProductFormData, productSchema } from "@/lib/validations/add-product";
import { useProductList } from "@/hooks/product-hook/useProductList";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<"product" | "category">(
    "product"
  );

  const { data: categoryList, refetch: categoryRefetch } = useCategoriesList();
  // console.log("Category List:", categoryList);
  const { mutate: createProduct, isPending: isCreatingProduct } =
    useCreateProduct();
  const { mutate: addCategory, isPending: isCreatingCategory } =
    useAddCategory();
  const {
    data: products,
    refetch: productRefetch,
    isPending,
  } = useProductList();
  //console.log("Products:", products);

  const {
    register: registerProduct,
    handleSubmit: handleProductSubmit,
    formState: { errors: productErrors },
    reset: resetProductForm,
    setValue: setProductValue,
    watch: watchProduct,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // Form handling for category
  const {
    register: registerCategory,
    handleSubmit: handleCategorySubmit,
    formState: { errors: categoryErrors },
    reset: resetCategoryForm,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (!dialogOpen) {
      resetProductForm();
      resetCategoryForm();
    }
  }, [dialogOpen, resetProductForm, resetCategoryForm]);

  // function to create a new product
  const onSubmitProduct = async (data: ProductFormData) => {
    const formPayload = new FormData();
    formPayload.append("name", data.name);
    formPayload.append("description", data.description);
    formPayload.append("price", data.price);
    formPayload.append("stock", data.stock);
    formPayload.append("category", data.category);
    formPayload.append("mainImage", data.mainImage);

    createProduct(formPayload, {
      onSuccess: (res) => {
        setDialogOpen(false);
        productRefetch(); // Refetch products to update the list
        toast.success(res.message || "Product added successfully!");
      },
    });
  };

  // function to create a new category
  const onSubmitCategory = (data: CategoryFormData) => {
    addCategory(data, {
      onSuccess: (res) => {
        categoryRefetch(); // Refetch categories to update the list
        setDialogOpen(false);
        toast.success(res.message || "Category added successfully!");
      },
    });
  };

  // function to handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductValue("mainImage", file);
    }
  };

  // functions to open the product form
  const openProductForm = () => {
    setActiveForm("product");
    setDialogOpen(true);
  };

  // function to open the category form
  const openCategoryForm = () => {
    setActiveForm("category");
    setDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="mb-6 md:mb-0">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your products and inventory
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={"outline"}
            onClick={openCategoryForm}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
          <Button onClick={openProductForm} className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {activeForm === "product"
                ? "Add New Product"
                : "Add New Category"}
            </DialogTitle>
            <DialogDescription>
              {activeForm === "product"
                ? "Fill in the details for your new product"
                : "Enter the name for your new category"}
            </DialogDescription>
          </DialogHeader>

          {activeForm === "product" ? (
            <form
              className="p-4 space-y-4"
              onSubmit={handleProductSubmit(onSubmitProduct)}
            >
              <div>
                <Label htmlFor="name" className="pb-4">
                  Product Name
                </Label>
                <Input id="name" {...registerProduct("name")} />
                {productErrors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {productErrors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="pb-4">
                  Description
                </Label>
                <Textarea
                  id="description"
                  {...registerProduct("description")}
                />
                {productErrors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {productErrors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="pb-4">
                    Price
                  </Label>
                  <Input
                    type="number"
                    id="price"
                    {...registerProduct("price")}
                  />
                  {productErrors.price && (
                    <p className="text-sm text-red-500 mt-1">
                      {productErrors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="stock" className="pb-4">
                    Stock Quantity
                  </Label>
                  <Input
                    type="number"
                    id="stock"
                    {...registerProduct("stock")}
                  />
                  {productErrors.stock && (
                    <p className="text-sm text-red-500 mt-1">
                      {productErrors.stock.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full">
                <Label htmlFor="category" className="pb-4">
                  Category
                </Label>
                <Select
                  onValueChange={(value) => setProductValue("category", value)}
                  value={watchProduct("category")}
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryList?.data?.categories?.length === 0 ? (
                      <SelectItem disabled value="no-category">
                        No category found. Please add category
                      </SelectItem>
                    ) : (
                      categoryList?.data?.categories?.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {productErrors.category && (
                  <p className="text-sm text-red-500 mt-1">
                    {productErrors.category.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="mainImage" className="pb-4">
                  Main Image
                </Label>
                <Input
                  type="file"
                  id="mainImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {productErrors.mainImage && (
                  <p className="text-sm text-red-500 mt-1">
                    {productErrors.mainImage.message}
                  </p>
                )}
                {watchProduct("mainImage") && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Selected: {watchProduct("mainImage")?.name}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isCreatingProduct}
              >
                Save Product
              </Button>
            </form>
          ) : (
            <form
              className="p-4 space-y-4"
              onSubmit={handleCategorySubmit(onSubmitCategory)}
            >
              <div>
                <Label htmlFor="categoryName" className="pb-4">
                  Category Name
                </Label>
                <Input id="categoryName" {...registerCategory("name")} />
                {categoryErrors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {categoryErrors.name.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isCreatingCategory}
              >
                Save Category
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/*summary dashboard UI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products?.data?.products?.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products?.data?.products?.filter((p) => p.stock < 10).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products?.data?.products?.filter((p) => p.stock === 0).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.data?.products &&
              products.data.products.length > 0 &&
              !isPending ? (
                products.data.products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="relative w-12 h-12">
                        <Image
                          src={product.mainImage?.url}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="object-cover rounded-md"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.stock === 0
                            ? "destructive"
                            : product.stock < 10
                            ? "secondary"
                            : "default"
                        }
                      >
                        {product.stock}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="pt-6 text-center">
                    No products are added
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Button
        type="submit"
        className="mt-4 cursor-pointer"
        onClick={() => router.push("/products")}
      >
        Back
      </Button>
    </div>
  );
}
