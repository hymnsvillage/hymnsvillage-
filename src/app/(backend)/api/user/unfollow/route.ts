import { createSupabaseServerClient } from "@/app/(backend)/lib";
import { NextRequest, NextResponse } from "next/server";

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
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { followed_id } = await req.json();
  if (!followed_id)
    return NextResponse.json({ error: "Missing target user" }, { status: 400 });

  const { error } = await supabase
    .from("followers")
    .delete()
    .eq("follower_id", user.id)
    .eq("followed_id", followed_id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "User unfollowed successfully" });
}
