import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { changeEmailSchema } from "@/app/(backend)/schemas/settingsSchemas";
import { NextRequest } from "next/server";

/**
 * @route POST /api/auth/settings/change-email
 * @description Request email change with confirmation link
 */
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return customResponse({
      success: false,
      message: "Unauthorized",
      statusCode: 401,
    });
  }

  const body = await req.json();
  const parsed = changeEmailSchema.safeParse(body);

  if (!parsed.success) {
    return customResponse({
      success: false,
      message: "Validation error",
      data: parsed.error.flatten(),
      statusCode: 400,
    });
  }

  const { newEmail } = parsed.data;

  const { error } = await supabase.auth.updateUser({
    email: newEmail,
  });

  if (error) {
    return customResponse({
      success: false,
      message: error.message,
      statusCode: 500,
    });
  }

  return customResponse({
    message: "Email change requested",
    statusCode: 200,
  });
}
