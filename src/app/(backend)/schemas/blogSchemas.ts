import "@/app/(backend)/zod-extend";
import { z } from "zod";

export const blogInputSchema = z.object({
  title: z.string().min(3).openapi({ example: "My Hymn Reflection" }),
  content: z.string().min(10).openapi({ example: "Today I reflected on..." }),
  categoryId: z.string().uuid().openapi({ example: "uuid-category-id" }),
  tags: z
    .array(z.string().uuid())
    .openapi({ example: ["uuid-tag-1", "uuid-tag-2"] }),
  mediaUrls: z.array(z.string().url()).optional(),
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
  content: z.string().min(1).max(500).openapi({ example: 'Beautiful hymn!' }),
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