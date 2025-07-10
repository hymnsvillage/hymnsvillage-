import "@/app/(backend)/zod-extend";
import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .email()
      .openapi({ example: "cleverakanimoh02@gmail.com" }),
    password: z.string().min(6).openapi({ example: "User$1234" }),
    name: z.string().min(1).openapi({ example: "Clever Akanimoh" }),
    username: z.string().min(1).openapi({ example: "CrushClever" }),
    role: z.string().min(1).openapi({ example: "user" }),
  })
  .openapi({ ref: "RegisterPayload", description: "Register a new user" });

export const loginSchema = z
  .object({
    email: z
      .string()
      .email()
      .openapi({ example: "cleverakanimoh02@gmail.com" }),
    password: z.string().min(6).openapi({ example: "User$1234" }),
  })
  .openapi({ ref: "LoginPayload", description: "User login" });

export const updateProfileSchema = z
  .object({
    name: z.string().min(1).optional().openapi({ example: "Clever" }),
    userRole: z.string().min(1).optional().openapi({ example: "user" }),
    avatar: z
      .instanceof(File)
      .optional()
      .openapi({ type: "string", format: "binary", example: undefined }),
  })
  .openapi({
    ref: "UpdateProfilePayload",
    description: "Update user information",
  });

export const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .email()
      .openapi({ example: "cleverakanimoh02@gmail.com" }),
  })
  .openapi({
    ref: "ForgotPasswordPayload",
    description: "Send password reset email",
  });

export const changePassSchema = z.object({
  accessToken: z.string().openapi({ example: "ejk3...." }),
  newPassword: z.string().min(6).openapi({ example: "User$1234" }),
});
