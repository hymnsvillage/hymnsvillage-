import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route GET /api/blog/:id
 * @description Get a single blog post with media, categories, tags
 * @access Public
 */
export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ must await
  const supabase = await createSupabaseServerClient();

  const { data: user } = await supabase.auth.getUser();

  const [{ data, error }, { data: impressions }] = await Promise.all([
    supabase
      .from("blogs")
      .select("*, categories(*), tags(*), blog_media(*)")
      .eq("id", id)
      .single(),
    supabase
      .from("impressions")
      .select("id")
      .eq("target_type", "blog")
      .eq("target_id", id)
      .eq("viewer_id", user.user?.id || "")
      .maybeSingle(),
  ]);

  const hasViewed = !!impressions;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(customResponse({ data: { ...data, hasViewed } }));
}

/**
 * @route PUT /api/blog/:id
 * @description Update a blog post
 * @access Private (requires auth)
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ must await
  const supabase = await createSupabaseServerClient();

  const body = await req.json();

  const { data, error } = await supabase
    .from("blogs")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(customResponse({ data }));
}

/**
 * @route DELETE /api/blog/:id
 * @description Delete a blog post
 * @access Private (requires auth)
 */
export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ must await
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(customResponse({ message: "Blog deleted" }));
}
