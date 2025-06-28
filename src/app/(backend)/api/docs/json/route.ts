import { openApiDocument } from "@/app/(backend)/docs/openapi";
import "@/zod-extend";

export function GET() {
  return Response.json(openApiDocument);
}
