import { NextResponse } from "next/server";
import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";

export async function GET() {
  const supabase = await createSupabaseServerClient();

  // Get logged in user for hasViewed check
  const { data: user } = await supabase.auth.getUser();

  // Fetch latest 6 blogs
  const { data, error } = await supabase
    .from("blogs")
    .select("*, blog_categories(name), blog_media(url)")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Collect all unique tag IDs from blogs
  const tagIds = data.flatMap((blog) => blog.tag_ids || []);
  const uniqueTagIds = [...new Set(tagIds)];

  // Fetch all tags in one go
  const { data: tags = [] } = await supabase
    .from("blog_tags")
    .select("*")
    .in("id", uniqueTagIds);

  // Check impressions
  const impressionPromises = data.map((blog) =>
    supabase
      .from("impressions")
      .select("id")
      .eq("target_type", "blog")
      .eq("target_id", blog.id)
      .eq("viewer_id", user.user?.id || "")
      .maybeSingle()
  );

  const impressionResults = await Promise.all(impressionPromises);

  // Build blog objects
  const blogs = data.map((blog, index) => ({
    ...blog,
    hasViewed: !!impressionResults[index].data,
    tags: tags
      ?.filter((t) => blog.tag_ids?.includes(t.id))
      ?.map((tag) => tag.name),
  }));

  return NextResponse.json(
    customResponse({
      data: { blogs },
    })
  );
}
