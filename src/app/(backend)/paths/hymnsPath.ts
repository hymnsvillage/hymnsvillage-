import { categoryInputSchema } from "../schemas/blogSchemas";
import {
  hymnCreateSchema,
  hymnSearchSchema,
  hymnUpdateSchema,
} from "../schemas/hymnSchemas";

export const hymnPaths = {
  "/api/hymn": {
    get: {
      tags: ["Hymn"],
      responses: { "200": { description: "All hymns" } },
    },
    post: {
      tags: ["Hymn"],
      requestBody: {
        content: { "multipart/form-data": { schema: hymnCreateSchema } },
      },
      responses: {
        "200": { description: "Hymn created" },
        "403": { description: "Forbidden" },
      },
    },
  },
  "/api/hymn/{id}": {
    get: {
      tags: ["Hymn"],
      responses: {
        "200": { description: "Get a hymn" },
        "404": { description: "Not found" },
      },
    },
    put: {
      tags: ["Hymn"],
      requestBody: {
        content: { "application/json": { schema: hymnUpdateSchema } },
      },
      responses: {
        "200": { description: "Hymn updated" },
        "403": { description: "Forbidden" },
      },
    },
    delete: {
      tags: ["Hymn"],
      responses: {
        "200": { description: "Hymn deleted" },
        "403": { description: "Forbidden" },
      },
    },
  },
  "/api/hymn/search": {
    post: {
      tags: ["Hymn"],
      requestBody: {
        content: { "application/json": { schema: hymnSearchSchema } },
      },
      responses: { "200": { description: "Filtered hymns" } },
    },
  },

  "/api/hymn/categories": {
    get: {
      tags: ["Hymn"],
      responses: { "200": { description: "List of hymn categories" } },
    },
    post: {
      tags: ["Hymn"],
      requestBody: {
        content: {
          "application/json": { schema: categoryInputSchema },
        },
      },
      responses: { "200": { description: "Category created" } },
    },
  },
  "/api/hymn/category/{id}": {
    put: {
      tags: ["Hymn"],
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
      tags: ["Hymn"],
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

  "/api/hymn/by-category": {
    get: {
      tags: ["Hymn"],
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
  "/api/hymn/{id}/view": {
    post: {
      tags: ["Analytics"],
      summary: "Track a hymn view",
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
