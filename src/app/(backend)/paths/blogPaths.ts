import {
  blogInputSchema,
  blogUpdateSchema,
  categoryInputSchema,
  commentInputSchema,
  searchQuerySchema,
  tagInputSchema,
} from "../schemas/blogSchemas";

export const blogPaths = {
  "/api/blog": {
    get: {
      tags: ["Blog"],
      responses: { "200": { description: "Get all blog posts" } },
    },
    post: {
      tags: ["Blog"],
      requestBody: {
        content: {
          "multipart/form-data": { schema: blogInputSchema },
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
      tags: ["Blog"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: { "200": { description: "Single blog post" } },
    },
    put: {
      tags: ["Blog"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": { schema: blogUpdateSchema },
        },
      },
      responses: { "200": { description: "Blog updated" } },
    },
    delete: {
      tags: ["Blog"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: { "200": { description: "Blog deleted" } },
    },
  },
  "/api/blog/category": {
    get: {
      tags: ["Blog"],
      responses: { "200": { description: "All categories" } },
    },
    post: {
      tags: ["Blog"],
      requestBody: {
        content: {
          "application/json": { schema: categoryInputSchema },
        },
      },
      responses: { "200": { description: "Category created" } },
    },
  },
  "/api/blog/category/{id}": {
    put: {
      tags: ["Blog"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      requestBody: {
        content: {
          "application/json": { schema: categoryInputSchema },
        },
      },
      responses: { "200": { description: "Category updated" } },
    },
    delete: {
      tags: ["Blog"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: { "200": { description: "Category deleted" } },
    },
  },
  "/api/blog/tag": {
    get: {
      tags: ["Blog"],
      responses: { "200": { description: "All tags" } },
    },
    post: {
      tags: ["Blog"],
      requestBody: {
        content: {
          "application/json": { schema: tagInputSchema },
        },
      },
      responses: { "200": { description: "Tag created" } },
    },
  },
  "/api/blog/tag/{id}": {
    delete: {
      tags: ["Blog"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: { "200": { description: "Tag deleted" } },
    },
  },
  "/api/blog/comment/{postId}": {
    get: {
      tags: ["Blog"],
      parameters: [
        {
          name: "postId",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: { "200": { description: "Get comments for post" } },
    },
    post: {
      tags: ["Blog"],
      parameters: [
        {
          name: "postId",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      requestBody: {
        content: {
          "application/json": { schema: commentInputSchema },
        },
      },
      responses: { "200": { description: "Comment added" } },
    },
  },
  "/api/blog/comment/{id}": {
    delete: {
      tags: ["Blog"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: { "200": { description: "Comment deleted" } },
    },
  },
  "/api/blog/search": {
    post: {
      tags: ["Blog"],
      requestBody: {
        content: {
          "application/json": { schema: searchQuerySchema },
        },
      },
      responses: { "200": { description: "Search results returned" } },
    },
  },
  "/api/blog/media-upload": {
    post: {
      tags: ["Blog"],
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
  "/api/blog/{id}/view": {
    post: {
      tags: ["Analytics"],
      summary: "Track a blog view",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        "200": { description: "View recorded" },
        "500": { description: "Failed to record view" },
      },
    },
  },
};
