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

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = changePassSchema.safeParse(body);

  if (!parsed.success) {
    return customResponse({
      success: false,
      message: "Validation error",
      data: parsed.error.flatten(),
      statusCode: 400,
    });
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.updateUser({
    password: parsed.data.newPassword,
  });

  if (error) {
    return customResponse({
      success: false,
      message: error.message,
      statusCode: 400,
    });
  }

  return customResponse({
    data: { user: data.user },
    message: "Password reset was successful",
    statusCode: 200,
  });
}
