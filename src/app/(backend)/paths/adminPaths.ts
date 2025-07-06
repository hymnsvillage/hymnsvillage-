import { updateProfileSchema } from "../schemas/authSchemas";

export const adminPaths = {
  "/api/admin/dashboard/overview": {
    get: {
      summary: "Admin Dashboard Overview",
      tags: ["Admin"],
      description: "Returns total counts for blogs, hymns, users",
      responses: {
        "200": {
          description: "Counts for dashboard",
          content: { "application/json": {} },
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
          content: { "application/json": {} },
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
          content: { "application/json": {} },
        },
        "404": { description: "User not found" },
      },
    },
    put: {
      summary: "Update user metadata or ban status",
      tags: ["Admin"],
      requestBody: {
        content: {
          "application/json": { schema: updateProfileSchema },
        },
      },
      responses: {
        "200": { description: "User updated" },
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
          content: { "application/json": {} },
        },
        "403": { description: "Unauthorized" },
        "500": { description: "Server error" },
      },
    },
  },
};
