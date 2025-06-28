"use client";

import "@/app/(backend)/zod-extend";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function DocsPage() {
  return <SwaggerUI url="/api/docs/json" />;
}
