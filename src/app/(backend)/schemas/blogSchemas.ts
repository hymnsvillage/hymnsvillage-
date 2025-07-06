import "@/app/(backend)/zod-extend";
import { z } from "zod";

export const blogInputSchema = z.object({
  title: z.string().min(3).openapi({ example: "My Hymn Reflection" }),
  content: z.string().min(10).openapi({ example: "Today I reflected on..." }),
  categoryId: z
    .string()
    .uuid()
    .openapi({ example: "4554fbe7-f028-4863-ba60-e4e28933eca7" }),
  tags: z
    .array(z.string().uuid())
    .optional()
    .openapi({
      example: [
        "9bbf9a0d-57ae-45e4-82cd-dc857b6c90be",
        "9bbf9a0d-57ae-45e4-82cd-dc857b6c90be",
        "98f67491-e3c7-4d7e-b261-69f9a3427bef",
        "fa7960bc-2e9f-412c-a747-82a145dfb562",
      ],
    }),
  media: z
    .array(
      z
        .instanceof(File)
        .optional()
        .openapi({ type: "string", format: "binary", example: undefined })
    )
    .optional(),
});

export const blogUpdateSchema = blogInputSchema.partial();

export const blogResponseSchema = blogInputSchema.extend({
  id: z.string().uuid(),
  authorId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// category schema

export const categoryInputSchema = z.object({
  name: z.string().min(2).max(50).openapi({ example: "Devotionals" }),
});

export const categoryUpdateSchema = categoryInputSchema.partial();

export const categoryResponseSchema = categoryInputSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Tags
export const tagInputSchema = z.object({
  name: z.string().min(1).max(50).openapi({ example: "Grace" }),
});

export const tagResponseSchema = tagInputSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
});

// Comments
export const commentInputSchema = z.object({
  content: z.string().min(1).max(500).openapi({ example: "Beautiful hymn!" }),
});

export const commentResponseSchema = commentInputSchema.extend({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  postId: z.string().uuid(),
  createdAt: z.string().datetime(),
});

// search
export const searchQuerySchema = z.object({
  q: z.string().optional().openapi({ example: "worship" }),
  categoryId: z.string().uuid().optional().openapi({ example: "uuid-cat" }),
  tagId: z
    .union([z.string(), z.array(z.string().uuid())])
    .optional()
    .openapi({ example: ["uuid-tag1", "uuid-tag2"] }),
});
