/**
 * @route POST /api/auth/login
 * @description Logs in a user with email and password.
 * @returns {200} Login success
 * @returns {400 | 401} Validation error or invalid credentials
 */

// route.ts
import { createSupabaseServerClient, loginSchema } from "@/app/(backend)/lib";
import { cleanUser, RawUser } from "@/app/(backend)/lib/cleanUser";
import { customResponse } from "@/app/(backend)/lib/customResponse";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json(
    customResponse({
      data: { ...cleanUser(data.user as RawUser) },
      statusCode: 200,
      message: "Login was successful",
    })
  );
}
