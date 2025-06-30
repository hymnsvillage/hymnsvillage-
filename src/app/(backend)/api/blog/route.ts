/* eslint-disable @typescript-eslint/no-explicit-any */
import { File, IncomingForm } from "formidable";
import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { createSupabaseServerClient, customResponse } from "../../lib";
import { blogInputSchema } from "../../schemas/blogSchemas";

export async function GET() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*, categories(*), tags(*)")
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(customResponse({ data: { blogs: data } }));
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = async (
  req: Request
): Promise<{
  fields: Record<string, any>;
  files: File[];
}> =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true, maxFiles: 10 });
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      const mediaFiles = Array.isArray(files.media)
        ? files.media
        : files.media
        ? [files.media]
        : [];
      resolve({ fields, files: mediaFiles });
    });
  });

/**
 * @route POST /api/blog
 * @description Create a new blog post
 * @access Authenticated users only
 */
export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fields, files } = await parseForm(req);

  // Tags come as a JSON string array
  const input = {
    ...fields,
    tags: JSON.parse(fields.tags || "[]"),
  };

  const parsed = blogInputSchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { title, content, categoryId, tags } = parsed.data;

  // Create the blog
  const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .insert({ title, content, category_id: categoryId, author_id: user.id })
    .select()
    .single();

  if (blogError) {
    return NextResponse.json({ error: blogError.message }, { status: 500 });
  }

  // Add tags
  for (const tagId of tags) {
    await supabase.from("blog_tags").insert({
      blog_id: blog.id,
      tag_id: tagId,
    });
  }

  // Upload media files
  const mediaUrls: string[] = [];

  for (const file of files) {
    const buffer = await readFile(file.filepath);
    const sizeMB = buffer.length / (1024 * 1024);
    if (sizeMB > 3) continue;

    const ext = file.originalFilename?.split(".").pop() || "jpg";
    const filePath = `blog-${blog.id}/${uuidv4()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-media")
      .upload(filePath, buffer, {
        contentType: file.mimetype || "image/jpeg",
        upsert: true,
      });

    if (uploadError) continue;

    const { data: publicUrl } = supabase.storage
      .from("blog-media")
      .getPublicUrl(filePath);

    mediaUrls.push(publicUrl.publicUrl);

    await supabase.from("blog_media").insert({
      blog_id: blog.id,
      url: publicUrl.publicUrl,
    });
  }

  return NextResponse.json(
    customResponse({
      data: { blog, media: mediaUrls },
      message: `${blog.title} created with ${mediaUrls.length} image(s)`,
    })
  );
}
