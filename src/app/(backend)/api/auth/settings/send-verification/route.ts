import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { appUrl } from "@/supabase";
import { NextResponse } from "next/server";

/**
 * @route POST /api/auth/settings/send-verification
 * @description Sends an email verification link to the current user
 */
export async function POST() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: user.email,
    options: {
      emailRedirectTo: appUrl + "/auth/verify",
    },
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    customResponse({ message: "Verification email sent" })
  );
}
