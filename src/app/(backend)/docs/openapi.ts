/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/app/(backend)/zod-extend";
import { appUrl } from "@/supabase";
import { createDocument } from "zod-openapi";
import { adminPaths } from "../paths/adminPaths";
import { authPaths } from "../paths/authPaths";
import { blogPaths } from "../paths/blogPaths";
import { hymnPaths } from "../paths/hymnsPath";
import { userPaths } from "../paths/userPaths";

export const openApiDocument = createDocument({
  openapi: "3.1.0",
  info: {
    title: "Hymns Village API",
    version: "1.0.0",
    description: "This is the official Hymns Village API documentation.",
    contact: {
      name: "Clever Akanimoh",
      email: "cleverakanimoh02@gmail.com",
      url: "",
    },
  },
  servers: [{ url: appUrl! }],
  tags: [
    { name: "Auth", description: "Authentication and user account management" },
    { name: "Blog", description: "Blog posts, categories, tags, and comments" },
    { name: "Hymn", description: "Hymn CRUD, search, and media" },
    { name: "User", description: "Follow/unfollow and user dashboards" },
    { name: "Analytics", description: "Tracking blog and hymn views" },
    {
      name: "User Dashboard",
      description: "User-specific analytics and recent activity",
    },
    {
      name: "Settings",
      description: "Profile, email, and notification settings",
    },
    { name: "Admin", description: "Admin-only dashboard and user control" },
  ],
  paths: {
    ...authPaths,
    ...blogPaths,
    ...hymnPaths,
    ...adminPaths,
    ...userPaths,
  } as any,
});
