import { z } from "zod";

// This schema validates the login form input
export const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
