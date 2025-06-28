import { openApiDocument } from "@/app/(backend)/docs/openapi";
import "@/app/(backend)/zod-extend";

export function GET() {
  return Response.json(openApiDocument);
}
