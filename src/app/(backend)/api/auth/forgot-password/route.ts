/**
 * @route POST /api/auth/forgot
 * @description Sends a password reset email to the given user.
 * @returns {200} Email sent
 * @returns {400 | 500} Validation or Supabase error
 */

import {
  createSupabaseServerClient,
  forgotPasswordSchema,
} from "@/app/(backend)/lib";
import { appUrl } from "@/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email } = parsed.data;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${appUrl}/reset-password`,
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Reset email sent" });
}
