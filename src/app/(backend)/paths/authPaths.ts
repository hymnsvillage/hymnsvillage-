import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "@/app/(backend)/lib";
import {
  changeEmailSchema,
  notificationSchema,
} from "../schemas/settingsSchemas";

export const authPaths = {
  "/api/auth/register": {
    post: {
      tags: ["Auth"],
      requestBody: {
        content: { "application/json": { schema: registerSchema } },
      },
      responses: {
        "200": { description: "User registered" },
        "400": { description: "Validation failed" },
      },
    },
  },
  "/api/auth/oauth/google": {
    post: {
      tags: ["Auth"],
      responses: {
        "200": { description: "Google auth initialized" },
        "400": { description: "Validation failed" },
      },
    },
  },
  "/api/auth/login": {
    post: {
      tags: ["Auth"],
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
      tags: ["Auth"],
      responses: { "200": { description: "Logged out" } },
    },
  },
  "/api/auth/me": {
    get: {
      tags: ["Auth"],
      responses: {
        "200": { description: "Current user info" },
        "401": { description: "Not authenticated" },
      },
    },
    put: {
      tags: ["Auth"],
      requestBody: {
        content: {
          "multipart/form-data": { schema: updateProfileSchema },
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
      tags: ["Auth"],
      requestBody: {
        content: { "application/json": { schema: forgotPasswordSchema } },
      },
      responses: {
        "200": { description: "Reset email sent" },
        "400": { description: "Invalid email" },
      },
    },
  },
  "/api/auth/settings/change-email": {
    post: {
      tags: ["Settings"],
      summary: "Change user email",
      requestBody: {
        required: true,
        content: {
          "application/json": { schema: changeEmailSchema },
        },
      },
      responses: {
        "200": { description: "Email change requested" },
        "400": { description: "Invalid input" },
        "401": { description: "Unauthorized" },
      },
    },
  },
  "/api/auth/settings/send-verification": {
    post: {
      tags: ["Settings"],
      summary: "Send email verification link",
      responses: {
        "200": { description: "Verification email sent" },
        "401": { description: "Unauthorized" },
        "500": { description: "Error sending email" },
      },
    },
  },
  "/api/auth/settings/notifications": {
    get: {
      tags: ["Settings"],
      summary: "Get notification preferences",
      responses: {
        "200": {
          description: "Returns current notification preferences",
          content: { "application/json": { schema: notificationSchema } },
        },
        "401": { description: "Unauthorized" },
      },
    },
    put: {
      tags: ["Settings"],
      summary: "Update notification preferences",
      requestBody: {
        content: {
          "application/json": { schema: notificationSchema },
        },
      },
      responses: {
        "200": { description: "Preferences updated" },
        "400": { description: "Invalid input" },
        "401": { description: "Unauthorized" },
      },
    },
  },
};
