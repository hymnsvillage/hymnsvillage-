// app/api/blog/search/route.ts
import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { searchQuerySchema } from "@/app/(backend)/schemas/blogSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createSupabaseServerClient();

  const { searchParams } = new URL(req.url);

  const queryParams = {
    q: searchParams.get("q") ?? undefined,
    categoryId: searchParams.get("categoryId") ?? undefined,
    tagId: searchParams.getAll("tagId") ?? undefined,
  };

  const parsed = searchQuerySchema.safeParse(queryParams);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { q, categoryId, tagId } = parsed.data;

  // Build initial query
  let query = supabase
    .from("blogs")
    .select("*, categories(*), tags(*), blog_tags(tag_id)")
    .order("created_at", { ascending: false });

  if (q) {
    query = query.ilike("title", `%${q}%`).or(`content.ilike.%${q}%`);
  }

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data: allPosts, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let filteredPosts = allPosts;

  // Filter by tags if tagId is present
  if (tagId && tagId.length > 0) {
    const tagArray = Array.isArray(tagId) ? tagId : [tagId];
    filteredPosts = allPosts.filter((post) =>
      post.tags?.some((t: { id: string }) => tagArray.includes(t.id))
    );
  }

  return NextResponse.json(
    customResponse({ data: { results: filteredPosts } })
  );
}
