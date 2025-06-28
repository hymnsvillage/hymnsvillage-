/**
 * @route POST /api/auth/register
 * @description Registers a new user with email, password, and name.
 * @returns {200} User registration success
 * @returns {400} Validation error or Supabase error
 */

import {
  createSupabaseServerClient,
  customResponse,
  registerSchema,
} from "@/app/(backend)/lib";
import { appUrl } from "@/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email, password, name, username } = parsed.data;
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, username },
      emailRedirectTo: `${appUrl}/auth/callback`,
    },
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(
    customResponse({
      message:
        "User registered successfully, Please check your mail to activate your account.",
      // data: { user: data.user },
    })
  );
}
