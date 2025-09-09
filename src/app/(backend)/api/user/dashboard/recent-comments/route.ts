import {
  createSupabaseServerClient,
  customResponse,
} from "@/app/(backend)/lib";

/**
 * @route GET /api/user/dashboard/recent-comments
 * @description Fetch most recent 4-5 comments across user's posts
 */
export async function GET() {
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

  const { data: comments, error } = await supabase
    .from("blog_comments")
    .select("id, content, created_at, user_id, blog_id")
    .order("created_at", { ascending: false })
    .eq("user_id", user.id)
    .limit(5);

  if (error) {
    return customResponse({
      success: false,
      message: error.message,
      statusCode: 500,
    });
  }

  return customResponse({
    data: { comments },
    message: "Recent comments fetched successfully",
    statusCode: 200,
  });
}
