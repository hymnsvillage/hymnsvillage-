import {
  createSupabaseServerClient,
  customResponse,
} from "@/app/(backend)/lib";
import { blogUpdateSchema } from "@/app/(backend)/schemas/blogSchemas";
import { NextRequest, NextResponse } from "next/server";

// GET single blog post with media
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*, categories(*), tags(*), blog_media(*)")
    .eq("id", params.id)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 404 });

  return NextResponse.json(customResponse({ data: { blog: data } }));
}

// PUT to update blog and its media
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: existing } = await supabase
    .from("blogs")
    .select("author_id")
    .eq("id", params.id)
    .single();

  const isOwner = user.id === existing?.author_id;
  const isAdmin = user.user_metadata?.role === "admin";

  if (!isOwner && !isAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = blogUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { title, content, categoryId, tags, mediaUrls = [] } = parsed.data;

  // 1. Update main blog fields
  const { error: updateError } = await supabase
    .from("blogs")
    .update({ title, content, category_id: categoryId })
    .eq("id", params.id);

  if (updateError)
    return NextResponse.json({ error: updateError.message }, { status: 500 });

  // 2. Update blog tags (optional: you could diff instead)
  await supabase.from("blog_tags").delete().eq("blog_id", params.id);
  if (tags) {
    for (const tagId of tags) {
      await supabase.from("blog_tags").insert({
        blog_id: params.id,
        tag_id: tagId,
      });
    }
  }

  // 3. Update blog media
  await supabase.from("blog_media").delete().eq("blog_id", params.id);
  for (const url of mediaUrls) {
    await supabase.from("blog_media").insert({
      blog_id: params.id,
      url,
    });
  }

  return NextResponse.json({ message: "Blog updated successfully" });
}

// DELETE blog
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: blog } = await supabase
    .from("blogs")
    .select("author_id")
    .eq("id", params.id)
    .single();

  const isOwner = user.id === blog?.author_id;
  const isAdmin = user.user_metadata?.role === "admin";

  if (!isOwner && !isAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { error } = await supabase.from("blogs").delete().eq("id", params.id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Blog deleted" });
}
