import "@/app/(backend)/zod-extend";
import z from "zod";

export const changeEmailSchema = z.object({
  newEmail: z.string().email().openapi({example:"crushclever1@gmail.com"}),
});

export const notificationSchema = z.object({
  newsletter: z.boolean().openapi({ example: true }),
  app_updates: z.boolean().openapi({ example: false }),
  comments: z.boolean().openapi({ example: true }),
});