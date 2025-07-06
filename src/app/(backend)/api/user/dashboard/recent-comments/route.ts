import {
    createSupabaseServerClient,
    customResponse,
} from "@/app/(backend)/lib";
import { NextResponse } from "next/server";

/**
 * @route GET /api/user/dashboard/recent-comments
 * @description Fetch most recent 4-5 comments across user's posts
 */
export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: comments, error } = await supabase
    .from("blog_comments")
    .select("id, content, created_at, user_id, blog_id, users(email)")
    .order("created_at", { ascending: false })
    .eq("author_id", user.id)
    .limit(5);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(customResponse({ data: { comments } }));
}
