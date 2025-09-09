import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { NextRequest } from "next/server";

/**
 * @route POST /api/user/follow
 * @description Follow another user
 * @access Authenticated users only
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

  const { followed_id } = await req.json();

  if (!followed_id || followed_id === user.id) {
    return customResponse({
      success: false,
      message: "Invalid follow target",
      statusCode: 400,
    });
  }

  const { error } = await supabase.from("followers").insert({
    follower_id: user.id,
    followed_id,
  });

  if (error) {
    return customResponse({
      success: false,
      message: "Sorry! we couldn't follow that user",
      statusCode: 500,
    });
  }

  return customResponse({
    message: "User followed successfully",
    statusCode: 200,
  });
}
