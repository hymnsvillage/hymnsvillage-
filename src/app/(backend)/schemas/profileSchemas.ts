import "@/app/(backend)/zod-extend";
import z from "zod";

export const updateMeSchema = z.object({
  name: z.string().min(1).optional().openapi({ example: "Clever Akanimoh" }),
  avatarFile: z.string().optional().openapi({ example: "" }),
  role: z.string().optional().openapi({ example: "User" }),
});

export const followerSchema = z.object({
  follower_id: z.string().uuid(),
  followed_id: z.string().uuid(),
  created_at: z.string(),
});

export const impressionSchema = z.object({
  target_type: z.enum(["blog", "hymn"]),
  target_id: z.string().uuid(),
  viewer_id: z.string().uuid().nullable(),
  created_at: z.string(),
});
