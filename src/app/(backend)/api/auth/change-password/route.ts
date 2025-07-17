/**
 * @route POST /api/auth/change-password
 * @description Use Supabase to change user's password via access token
 * @param { token, newPassword }
 */

import {
  changePassSchema,
  createSupabaseServerClient,
} from "@/app/(backend)/lib";
import { customResponse } from "@/app/(backend)/lib/customResponse";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = changePassSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.auth.updateUser({
    password: parsed.data.newPassword,
  });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(
    customResponse({
      data: { user: data.user },
      message: "Password reset was successful",
    })
  );
}

// Endpoint to confirm reset password can be handled client-side with the token and same endpoint
