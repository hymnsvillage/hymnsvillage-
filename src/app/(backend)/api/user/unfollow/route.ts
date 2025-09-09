import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { NextRequest } from "next/server";

/**
 * @route DELETE /api/user/unfollow
 * @description Unfollow a user
 * @access Authenticated users only
 */
export async function DELETE(req: NextRequest) {
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
  if (!followed_id) {
    return customResponse({
      success: false,
      message: "Missing target user",
      statusCode: 400,
    });
  }

  const { error } = await supabase
    .from("followers")
    .delete()
    .eq("follower_id", user.id)
    .eq("followed_id", followed_id);

  if (error) {
    return customResponse({
      success: false,
      message: error.message,
      statusCode: 500,
    });
  }

  return customResponse({
    message: "User unfollowed successfully",
    statusCode: 200,
  });
}
