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

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return customResponse({
      success: false,
      message: "Validation error",
      data: parsed.error.flatten(),
      statusCode: 400,
    });
  }

  const { email, password, name, username, role: userRole } = parsed.data;
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, username, userRole },
      emailRedirectTo: `${appUrl}/auth/callback`,
    },
  });

  if (error) {
    return customResponse({
      success: false,
      message: error.message,
      statusCode: 400,
    });
  }

  return customResponse({
    message:
      "User registered successfully. Please check your mail to activate your account.",
    statusCode: 200,
  });
}
