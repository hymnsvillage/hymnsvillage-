import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { changeEmailSchema } from "@/app/(backend)/schemas/settingsSchemas";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route POST /api/auth/settings/change-email
 * @description Request email change with confirmation link
 */
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = changeEmailSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { newEmail } = parsed.data;

  const { error } = await supabase.auth.updateUser({
    email: newEmail,
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    customResponse({ message: "Email change requested" })
  );
}
