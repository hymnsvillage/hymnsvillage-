// lib/customResponse.ts
import { NextResponse } from "next/server";

interface ResponseOptions<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T | null;
  statusCode?: number;
}

export function customResponse<T = unknown>({
  success = true,
  message = "Success",
  data = null,
  statusCode = 200,
}: ResponseOptions<T | null>) {
  return NextResponse.json(
    {
      success,
      message,
      data,
    },
    { status: statusCode }
  );
}
