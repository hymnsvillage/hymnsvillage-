// src/app/(backend)/api/blog/[id]/route.ts
import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { blogUpdateSchema } from "@/app/(backend)/schemas/blogSchemas";
import { NextRequest, NextResponse } from "next/server";

interface Blog {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category_id: string;
  created_at: string;
}

//
// GET a single blog post with media, tags, impressions
//
export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIXED

  const supabase = await createSupabaseServerClient();
  const { data: user } = await supabase.auth.getUser();

  const [blogRes, mediaRes, tagsRes, impressionsRes] = await Promise.all([
    supabase.from("blogs").select("*").eq("id", id).single<Blog>(),
    supabase.from("blog_media").select("*").eq("blog_id", id),
    supabase.from("blog_tags").select("*").eq("blog_id", id),
    supabase
      .from("impressions")
      .select("id")
      .eq("target_type", "blog")
      .eq("target_id", id)
      .eq("viewer_id", user.user?.id || "")
      .maybeSingle(),
  ]);

  if (blogRes.error) {
    return NextResponse.json(
      customResponse(false, blogRes.error.message, null),
      { status: 404 }
    );
  }

  const hasViewed = !!impressionsRes.data;

  return NextResponse.json(
    customResponse(true, "Success", {
      ...blogRes.data,
      media: mediaRes.data || [],
      tags: tagsRes.data || [],
      hasViewed,
    })
  );
}

//
// PUT update blog + tags + media
//
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIXED

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: existing } = await supabase
    .from("blogs")
    .select("author_id")
    .eq("id", id)
    .single<Blog>();

  const isOwner = user.id === existing?.author_id;
  const isAdmin = user.user_metadata?.role === "admin";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = blogUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { title, content, categoryId, tags, mediaUrls } = parsed.data as {
    title: string;
    content: string;
    categoryId: string;
    tags?: string[];
    mediaUrls?: string[];
  };

  // 1. Update blog
  const { error: updateError } = await supabase
    .from("blogs")
    .update({ title, content, category_id: categoryId })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // 2. Replace tags
  await supabase.from("blog_tags").delete().eq("blog_id", id);
  if (tags && tags.length > 0) {
    const tagInserts = tags.map((tagId: string) => ({
      blog_id: id,
      tag_id: tagId,
    }));
    await supabase.from("blog_tags").insert(tagInserts);
  }

  // 3. Replace media
  await supabase.from("blog_media").delete().eq("blog_id", id);
  if (mediaUrls && mediaUrls.length > 0) {
    const mediaInserts = mediaUrls.map((url: string) => ({
      blog_id: id,
      url,
    }));
    await supabase.from("blog_media").insert(mediaInserts);
  }

  return NextResponse.json({ message: "Blog updated successfully" });
}

//
// DELETE blog
//
export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIXED

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: blog } = await supabase
    .from("blogs")
    .select("author_id")
    .eq("id", id)
    .single<Blog>();

  const isOwner = user.id === blog?.author_id;
  const isAdmin = user.user_metadata?.role === "admin";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Blog deleted" });
}
