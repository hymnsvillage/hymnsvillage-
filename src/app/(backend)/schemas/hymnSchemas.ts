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
    category_id: z.string().uuid().openapi({ example: "uuid-of-category" }),
  })
  .openapi({ ref: "HymnCreate", description: "Create a new hymn" });

export const hymnUpdateSchema = hymnCreateSchema
  .partial()
  .openapi({ ref: "HymnUpdate" , description:"Update an existing hymn based on it's ID"});
