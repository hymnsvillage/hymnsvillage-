import {
  createSupabaseServerClient,
  customResponse,
} from "@/app/(backend)/lib";
import { NextResponse } from "next/server";

/**
 * @route GET /api/user/dashboard/overview
 * @description Get total user dashboard stats
 * @access Authenticated users only
 */
export async function GET() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = user.id;

  const [postCount, followerCount, likeCount, impressionCount] =
    await Promise.all([
      supabase
        .from("blogs")
        .select("*", { count: "exact", head: true })
        .eq("author_id", userId),
      supabase
        .from("followers")
        .select("*", { count: "exact", head: true })
        .eq("followed_id", userId),
      supabase
        .from("blog_likes")
        .select("*", { count: "exact", head: true })
        .eq("author_id", userId),
      supabase
        .from("blog_impressions")
        .select("*", { count: "exact", head: true })
        .eq("author_id", userId),
    ]);

  return NextResponse.json(
    customResponse({
      data: {
        posts: postCount.count ?? 0,
        followers: followerCount.count ?? 0,
        likes: likeCount.count ?? 0,
        impressions: impressionCount.count ?? 0,
      },
    })
  );
}
