import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)), "Must be a number")
    .refine((val) => Number(val) > 0, "Price must be greater than 0"),
  stock: z
    .string()
    .min(1, "Stock quantity is required")
    .refine((val) => !isNaN(Number(val)), "Must be a number")
    .refine((val) => Number(val) >= 0, "Stock cannot be negative"),
  category: z.string().min(1, "Category is required"),
  mainImage: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "Max image size is 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Only .jpg, .png, and .webp formats are supported"
    ),
});

export type ProductFormData = z.infer<typeof productSchema>;
