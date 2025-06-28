import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email().openapi({ example: "user@example.com" }),
    password: z.string().min(6).openapi({ example: "securePass123" }),
    name: z.string().min(1).openapi({ example: "Clever Akanimoh" }),
  })
  .openapi({ ref: "RegisterPayload", description: "Register a new user" });

export const loginSchema = z
  .object({
    email: z.string().email().openapi({ example: "user@example.com" }),
    password: z.string().min(6).openapi({ example: "securePass123" }),
  })
  .openapi({ ref: "LoginPayload", description: "User login" });

export const updateProfileSchema = z
  .object({
    name: z.string().min(1).optional().openapi({ example: "Clever" }),
    avatar_url: z
      .string()
      .url()
      .optional()
      .openapi({ example: "https://cdn.site.com/avatar.png" }),
  })
  .openapi({
    ref: "UpdateProfilePayload",
    description: "Update name or avatar",
  });

export const forgotPasswordSchema = z
  .object({
    email: z.string().email().openapi({ example: "user@example.com" }),
  })
  .openapi({
    ref: "ForgotPasswordPayload",
    description: "Send password reset email",
  });
