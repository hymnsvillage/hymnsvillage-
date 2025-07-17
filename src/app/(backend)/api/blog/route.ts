import { File } from "buffer";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import {
  createSupabaseServerClient,
  customResponse,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from "../../lib";
import { orderResponse } from "../../lib/orderResponse";
import { blogInputSchema } from "../../schemas/blogSchemas";

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const { data: user } = await supabase.auth.getUser();

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || `${DEFAULT_PAGE}`, 10);
  const limit = parseInt(searchParams.get("limit") || `${DEFAULT_LIMIT}`, 10);
  const offset = (page - 1) * limit;

  const { data, error } = await supabase
    .from("blogs")
    .select("*, blog_categories(name), blog_media(url)", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const blogs = [];

  // Collect all unique tag IDs from all blogs
  const tagIds = data.flatMap((blog) => blog.tag_ids || []);
  const uniqueTagIds = [...new Set(tagIds)];

  // Fetch all tags in one query
  const { data: tags = [] } = await supabase
    .from("blog_tags")
    .select("*")
    .in("id", uniqueTagIds);

  // Prepare impression checks concurrently
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

  // Build blogs array
  for (let index = 0; index < data.length; index++) {
    const blog = data[index];
    const impressions = impressionResults[index].data;
    const hasViewed = !!impressions;

    blogs.push({
      ...blog,
      hasViewed,
      tags: tags
        ?.filter((t) => blog.tag_ids?.includes(t.id))
        ?.map((tag) => tag.name),
    });
  }

  return NextResponse.json(
    customResponse({
      data: {
        ...orderResponse({ data: blogs, limit, page }),
        blogs,
      },
    })
  );
}

/**
 * @route POST /api/blog
 * @description Create a new blog post
 * @access Authenticated users only
 */
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();

  const title = formData.get("title")?.toString() || "";
  const content = formData.get("content")?.toString() || "";
  const categoryId = formData.get("categoryId")?.toString() || "";
  const rawTags = formData.get("tags")?.toString() || "";
  const tags = [
    ...new Set(
      rawTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    ),
  ];

  const mediaFiles = formData.getAll("media") as unknown as File[];

  const parsed = blogInputSchema.safeParse({
    title,
    content,
    categoryId,
    tags,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .insert({
      title,
      content,
      category_id: categoryId,
      tag_ids: tags,
      author_id: user.id,
    })
    .select()
    .single();

  if (blogError)
    return NextResponse.json({ error: blogError.message }, { status: 500 });

  const mediaUrls: string[] = [];

  if (mediaFiles) {
    for (const file of mediaFiles) {
      const buffer = Buffer.from(await file?.arrayBuffer());
      const sizeMB = buffer.length / (1024 * 1024);
      if (sizeMB > 10) continue;

      const ext = file?.name?.split(".").pop() || "jpg";
      const filePath = `${user.id}/${blog.id}/${uuidv4()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-media")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) {
        await supabase.from("blogs").delete().eq("id", blog.id);
        return NextResponse.json(
          { error: uploadError.message },
          { status: 500 }
        );
      }

      const { data: publicUrl } = supabase.storage
        .from("blog-media")
        .getPublicUrl(filePath);

      mediaUrls.push(publicUrl.publicUrl);

      await supabase.from("blog_media").insert({
        blog_id: blog.id,
        url: publicUrl.publicUrl,
      });
    }
  }

  return NextResponse.json(
    customResponse({
      data: { ...blog, mediaUrls },
      message: `${blog.title} was created successfully`,
    })
  );
}
