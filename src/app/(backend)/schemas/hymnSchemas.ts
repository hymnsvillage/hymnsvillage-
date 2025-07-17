import "@/app/(backend)/zod-extend";
import { z } from "zod";

export const hymnCreateSchema = z
  .object({
    title: z.string().min(2).openapi({ example: "Great Is Thy Faithfulness" }),
    lyrics: z
      .string()
      .min(5)
      .openapi({ example: "Great is thy faithfulness..." }),
    author: z.string().optional().openapi({ example: "Thomas Chisholm" }),
    number: z.number().int().positive().openapi({ example: 23 }),
    language: z.enum(["English", "Ibibio", "Efik"]).openapi({
      example: "Ibibio",
    }),
    category_id: z
      .string()
      .uuid()
      .openapi({ example: "76aaca9a-b13e-42e6-9a8a-a966b85787c5" }),
    audio_url: z
      .instanceof(File)
      .optional()
      .openapi({ type: "string", format: "binary", example: undefined }),
    video_url: z
      .instanceof(File)
      .optional()
      .openapi({ type: "string", format: "binary", example: undefined }),
  })
  .openapi({ ref: "HymnCreate", description: "Create a new hymn" });

export const hymnUpdateSchema = hymnCreateSchema.partial().openapi({
  ref: "HymnUpdate",
  description: "Update an existing hymn based on it's ID",
});

export const hymnSearchSchema = z
  .object({
    title: z.string().optional().openapi({ example: "Holy, Holy, Holy" }),
    lyrics: z.string().optional().openapi({ example: "Blessed Trinity" }),
    author: z.string().optional().openapi({ example: "Reginald Heber" }),
    number: z.number().optional().openapi({ example: 101 }),
    language: z
      .enum(["English", "Ibibio", "Efik"])
      .optional()
      .openapi({ example: "Ibibio" }),
  })
  .openapi({
    ref: "HymnSearch",
    description:
      "The search keyword for specific hymns. This can be done on the frontend",
  });

export const hymnCommentSchema = z
  .object({
    content: z
      .string()
      .min(1)
      .max(500)
      .openapi({ example: "This hymn really touched my heart." }),
  })
  .openapi({ ref: "HymnComment", description: "Comment for hymns" });

export const hymnMediaUploadSchema = z
  .object({
    hymnId: z
      .string()
      .uuid()
      .openapi({ example: "d1f1c318-6a90-4f7f-bc89-7dc3f1a4b6b4" }),
    type: z.enum(["audio", "video"]).openapi({ example: "audio" }),
    media: z.any().openapi({ type: "string", format: "binary" }),
  })
  .openapi({ ref: "HymnMediaUpload", description: "Media upload for hymns" });
