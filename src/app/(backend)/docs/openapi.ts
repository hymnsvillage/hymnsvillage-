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
import {
  hymnCreateSchema,
  hymnSearchSchema,
  hymnUpdateSchema,
} from "../schemas/hymnSchemas";
import {
  changeEmailSchema,
  notificationSchema,
} from "../schemas/settingsSchemas";

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

    "/api/hymn/search": {
      post: {
        requestBody: {
          content: { "application/json": { schema: hymnSearchSchema } },
        },
        responses: { "200": { description: "Filtered hymns" } },
      },
    },
    "/api/hymn/categories": {
      get: {
        responses: { "200": { description: "List of hymn categories" } },
      },
    },
    "/api/hymn/by-category": {
      get: {
        parameters: [
          {
            name: "name",
            in: "query",
            required: true,
            example: "Praise",
          },
        ],
        responses: { "200": { description: "Filtered hymns by category" } },
      },
    },
    "/api/admin/dashboard/overview": {
      get: {
        summary: "Admin Dashboard Overview",
        description: "Returns total counts for blogs, hymns, users",
        responses: {
          "200": {
            description: "Counts for dashboard",
            content: {
              "application/json": {},
            },
          },
          "403": { description: "Forbidden (not admin)" },
        },
      },
    },
    "/api/admin/dashboard/users": {
      get: {
        summary: "Get all users",
        tags: ["Admin"],
        responses: {
          "200": {
            description: "Returns a list of all users",
            content: {
              "application/json": {},
            },
          },
          "403": { description: "Forbidden - Not an admin" },
        },
      },
    },

    "/api/admin/dashboard/users/{id}": {
      get: {
        summary: "Get a single user by ID",
        tags: ["Admin"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Returns a single user",
            content: {
              "application/json": {},
            },
          },
          "404": { description: "User not found" },
        },
      },
      put: {
        summary: "Update user metadata or ban status",
        tags: ["Admin"],
        requestBody: {
          content: {
            "application/json": {
              schema: updateProfileSchema,
            },
          },
        },
        responses: {
          "200": {
            description: "User updated",
            content: {
              "application/json": {},
            },
          },
          "400": { description: "Invalid input" },
          "403": { description: "Unauthorized" },
        },
      },
      delete: {
        summary: "Delete a user",
        tags: ["Admin"],
        responses: {
          "200": {
            description: "User deleted successfully",
            content: {
              "application/json": {},
            },
          },
          "403": { description: "Unauthorized" },
          "500": { description: "Server error" },
        },
      },
    },
    "/api/auth/settings/change-email": {
      post: {
        summary: "Change user email",
        tags: ["Auth Settings"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: changeEmailSchema,
            },
          },
        },
        responses: {
          "200": {
            description: "Email change requested",
            content: {
              "application/json": {},
            },
          },
          "400": { description: "Invalid input" },
          "401": { description: "Unauthorized" },
        },
      },
    },

    "/api/auth/settings/send-verification": {
      post: {
        summary: "Send email verification link",
        tags: ["Auth Settings"],
        responses: {
          "200": {
            description: "Verification email sent",
            content: {
              "application/json": {},
            },
          },
          "401": { description: "Unauthorized" },
          "500": { description: "Error sending email" },
        },
      },
    },

    "/api/auth/settings/notifications": {
      get: {
        summary: "Get notification preferences",
        tags: ["Auth Settings"],
        responses: {
          "200": {
            description: "Returns current notification preferences",
            content: {
              "application/json": {
                schema: notificationSchema,
              },
            },
          },
          "401": { description: "Unauthorized" },
        },
      },
      put: {
        summary: "Update notification preferences",
        tags: ["Auth Settings"],
        requestBody: {
          content: {
            "application/json": {
              schema: notificationSchema,
            },
          },
        },
        responses: {
          "200": {
            description: "Preferences updated",
            content: {
              "application/json": {},
            },
          },
          "400": { description: "Invalid input" },
          "401": { description: "Unauthorized" },
        },
      },
    },
    "/api/user/dashboard/overview": {
      get: {
        summary: "Get dashboard overview stats",
        tags: ["User Dashboard"],
        responses: {
          "200": {
            description: "Returns post, follower, like, impression counts",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/user/dashboard/analytics": {
      get: {
        summary: "Get analytics chart data (weekly)",
        tags: ["User Dashboard"],
        responses: {
          "200": {
            description: "Returns daily view/impression counts",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/user/dashboard/recent-comments": {
      get: {
        summary: "Get 4-5 most recent comments on your posts",
        tags: ["User Dashboard"],
        responses: {
          "200": {
            description: "Returns recent comments",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/user/follow": {
      post: {
        summary: "Follow a user",
        tags: ["User"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  followed_id: {
                    type: "string",
                    format: "uuid",
                    example: "b6f9d6ae-3f23-4a9b-b13b-f123e4de1ca1",
                  },
                },
                required: ["followed_id"],
              },
            },
          },
        },
        responses: {
          "200": { description: "Followed successfully" },
          "400": { description: "Invalid follow target" },
          "401": { description: "Unauthorized" },
          "500": { description: "Internal server error" },
        },
      },
    },
    "/api/user/unfollow": {
      delete: {
        summary: "Unfollow a user",
        tags: ["User"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  followed_id: {
                    type: "string",
                    format: "uuid",
                    example: "b6f9d6ae-3f23-4a9b-b13b-f123e4de1ca1",
                  },
                },
                required: ["followed_id"],
              },
            },
          },
        },
        responses: {
          "200": { description: "Unfollowed successfully" },
          "400": { description: "Missing target user" },
          "401": { description: "Unauthorized" },
          "500": { description: "Internal server error" },
        },
      },
    },
    "/api/blog/{id}/view": {
      post: {
        summary: "Track a blog view",
        tags: ["Analytics"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        responses: {
          "200": { description: "View recorded" },
          "500": { description: "Failed to record view" },
        },
      },
    },
    "/api/hymn/{id}/view": {
      post: {
        summary: "Track a hymn view",
        tags: ["Analytics"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        responses: {
          "200": { description: "View recorded" },
          "500": { description: "Failed to record view" },
        },
      },
    },

    
  },
});
