import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route POST /api/user/follow
 * @description Follow another user
 * @access Authenticated users only
 */
export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { followed_id } = await req.json();
  if (!followed_id || followed_id === user.id)
    return NextResponse.json(
      { error: "Invalid follow target" },
      { status: 400 }
    );

  const { error } = await supabase.from("followers").insert({
    follower_id: user.id,
    followed_id,
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    customResponse({ message: "User followed successfully" })
  );
}
