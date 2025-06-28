import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "@/app/(backend)/lib";
import "@/app/(backend)/zod-extend";
import { appUrl } from "@/supabase";
import { createDocument } from "zod-openapi";
import {
  blogInputSchema,
  blogUpdateSchema,
  categoryInputSchema,
  commentInputSchema,
  searchQuerySchema,
  tagInputSchema,
} from "../schemas/blogSchemas";
import { hymnCreateSchema, hymnUpdateSchema } from "../schemas/hymnSchemas";

export const openApiDocument = createDocument({
  openapi: "3.1.0",
  info: {
    title: "Hymns Village API",
    version: "1.0.0",
    description: "This is the official Hymns Village API documentation.",
    contact: {
      name: "Clever Akanimoh",
      email: "cleverakanimoh02@gmail.com",
    },
  },
  servers: [{ url: appUrl! }],
  paths: {
    // AUTH
    "/api/auth/register": {
      post: {
        requestBody: {
          content: { "application/json": { schema: registerSchema } },
        },
        responses: {
          "200": { description: "User registered" },
          "400": { description: "Validation failed" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        requestBody: {
          content: { "application/json": { schema: loginSchema } },
        },
        responses: {
          "200": { description: "Login success" },
          "401": { description: "Invalid credentials" },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        responses: { "200": { description: "Logged out" } },
      },
    },
    "/api/auth/me": {
      get: {
        responses: {
          "200": { description: "Current user info" },
          "401": { description: "Not authenticated" },
        },
      },
      put: {
        requestBody: {
          content: {
            "application/json": { schema: updateProfileSchema },
          },
        },
        responses: {
          "200": { description: "Profile updated" },
          "400": { description: "Invalid input" },
        },
      },
    },
    "/api/auth/forgot-password": {
      post: {
        requestBody: {
          content: { "application/json": { schema: forgotPasswordSchema } },
        },
        responses: {
          "200": { description: "Reset email sent" },
          "400": { description: "Invalid email" },
        },
      },
    },

    // BLOG
    "/api/blog": {
      get: {
        responses: {
          "200": { description: "Get all blog posts" },
        },
      },
      post: {
        requestBody: {
          content: {
            "application/json": { schema: blogInputSchema },
          },
        },
        responses: {
          "200": { description: "New blog created" },
          "400": { description: "Invalid blog input" },
        },
      },
    },
    "/api/blog/{id}": {
      get: {
        parameters: [],
        responses: { "200": { description: "Single blog post" } },
      },
      put: {
        requestBody: {
          content: {
            "application/json": { schema: blogUpdateSchema },
          },
        },
        responses: {
          "200": { description: "Blog updated" },
        },
      },
      delete: {
        responses: { "200": { description: "Blog deleted" } },
      },
    },

    // BLOG CATEGORY
    "/api/blog/category": {
      get: { responses: { "200": { description: "All categories" } } },
      post: {
        requestBody: {
          content: {
            "application/json": { schema: categoryInputSchema },
          },
        },
        responses: {
          "200": { description: "Category created" },
        },
      },
    },
    "/api/blog/category/{id}": {
      put: {
        requestBody: {
          content: {
            "application/json": { schema: categoryInputSchema },
          },
        },
        responses: {
          "200": { description: "Category updated" },
        },
      },
      delete: {
        responses: { "200": { description: "Category deleted" } },
      },
    },

    // TAG
    "/api/blog/tag": {
      get: { responses: { "200": { description: "All tags" } } },
      post: {
        requestBody: {
          content: { "application/json": { schema: tagInputSchema } },
        },
        responses: {
          "200": { description: "Tag created" },
        },
      },
    },
    "/api/blog/tag/{id}": {
      delete: {
        responses: { "200": { description: "Tag deleted" } },
      },
    },

    // COMMENT
    "/api/blog/comment/{postId}": {
      get: {
        responses: { "200": { description: "Get comments for post" } },
      },
      post: {
        requestBody: {
          content: { "application/json": { schema: commentInputSchema } },
        },
        responses: {
          "200": { description: "Comment added" },
        },
      },
    },
    "/api/blog/comment/{id}": {
      delete: {
        responses: { "200": { description: "Comment deleted" } },
      },
    },

    // SEARCH
    "/api/blog/search": {
      post: {
        requestBody: {
          content: {
            "application/json": { schema: searchQuerySchema },
          },
        },
        responses: {
          "200": { description: "Search results returned" },
        },
      },
    },

    // MEDIA UPLOAD
    "/api/blog/media-upload": {
      post: {
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  media: {
                    type: "array",
                    items: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Media uploaded" },
          "413": { description: "File too large" },
        },
      },
    },

    // HYMNS
    "/api/hymn": {
      get: {
        responses: { "200": { description: "All hymns" } },
      },
      post: {
        requestBody: {
          content: { "application/json": { schema: hymnCreateSchema } },
        },
        responses: {
          "200": { description: "Hymn created" },
          "403": { description: "Forbidden" },
        },
      },
    },
    "/api/hymn/{id}": {
      get: {
        responses: {
          "200": { description: "Get a hymn" },
          "404": { description: "Not found" },
        },
      },
      put: {
        requestBody: {
          content: { "application/json": { schema: hymnUpdateSchema } },
        },
        responses: {
          "200": { description: "Hymn updated" },
          "403": { description: "Forbidden" },
        },
      },
      delete: {
        responses: {
          "200": { description: "Hymn deleted" },
          "403": { description: "Forbidden" },
        },
      },
    },
  },
});
