import z from "zod";

export const updateMeSchema = z.object({
  name: z.string().min(1).optional().openapi({ example: "Clever Akanimoh" }),
  avatarFile: z.string().optional().openapi({example:""})
});
