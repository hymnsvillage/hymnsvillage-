// docs/openapi.ts
import {
    forgotPasswordSchema,
    loginSchema,
    registerSchema,
    updateProfileSchema,
} from "@/app/(backend)/lib";
import { createDocument } from "zod-openapi";

export const openApiDocument = createDocument({
  openapi: "3.1.0",
  info: { title: "Auth API", version: "1.0.0" },
  servers: [{ url: "http://localhost:3000" }],
  paths: {
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
    },
    "/api/auth/profile": {
      put: {
        requestBody: {
          content: { "application/json": { schema: updateProfileSchema } },
        },
        responses: {
          "200": { description: "Profile updated" },
          "400": { description: "Bad input" },
        },
      },
    },
    "/api/auth/forgot": {
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
  },
});
