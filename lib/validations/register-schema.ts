import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
