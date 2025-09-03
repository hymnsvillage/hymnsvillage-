// src/app/(backend)/lib/customResponse.ts
import { NextResponse } from "next/server";

export function customResponse(
  success: boolean = true,
  message: string = "Success",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any = null,
  statusCode: number = 200
) {
  return NextResponse.json(
    {
      success,
      message,
      data,
    },
    { status: statusCode }
  );
}
