import {
  createSupabaseServerClient,
  customResponse,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from "@/app/(backend)/lib";
import { hymnCreateSchema } from "@/app/(backend)/schemas/hymnSchemas";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { orderResponse } from "../../lib/orderResponse";

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: user } = await supabase.auth.getUser();

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || `${DEFAULT_PAGE}`, 10);
  const limit = parseInt(searchParams.get("limit") || `${DEFAULT_LIMIT}`, 10);
  const offset = (page - 1) * limit;

  const { data, error } = await supabase
    .from("hymns")
    .select("*, hymn_categories(*), hymn_media(*)")
    .order("number", { ascending: true })
    .range(offset, offset + limit - 1);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const hymns = [];

  for (let index = 0; index < data.length; index++) {
    const hymn = data[index];

    const { data: impressions } = await supabase
      .from("impressions")
      .select("id")
      .eq("target_type", "hymn")
      .eq("target_id", hymn.id)
      .eq("viewer_id", user.user?.id || "")
      .maybeSingle();

    const hasViewed = !!impressions;

    hymns.push({ ...hymn, hasViewed });
  }

  return NextResponse.json(
    customResponse({
      data: { hymns, hymnsInfo: orderResponse({ page, limit, data: hymns }) },
    })
  );
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 403 });
  }

  const formData = await req.formData();

  const mediaFiles = formData.getAll("media") as File[];

  const title = formData.get("title")?.toString() || "";
  const lyrics = formData.get("lyrics")?.toString() || "";
  const author = formData.get("author")?.toString() || "";
  const categoryId = formData.get("categoryId")?.toString() || "";
  const number = formData.get("number")?.toString() || "";

  const parsed = hymnCreateSchema.safeParse({
    title,
    lyrics,
    author,
    number,
    categoryId,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { data: hymn, error: insertError } = await supabase
    .from("hymns")
    .insert(parsed.data)
    .select()
    .single();

  if (insertError)
    return NextResponse.json({ error: insertError.message }, { status: 500 });

  // Upload media
  const mediaUrls: string[] = [];
  if (mediaFiles) {
    for (const file of mediaFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const sizeMB = buffer.length / (1024 * 1024);
      if (sizeMB > 10) continue;

      const ext = file.name.split(".").pop() || "mp3";
      const filePath = `hymn-${hymn.id}/${uuidv4()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("hymn-media")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) continue;

      const { data: publicUrl } = supabase.storage
        .from("hymn-media")
        .getPublicUrl(filePath);

      mediaUrls.push(publicUrl.publicUrl);

      await supabase.from("hymn_media").insert({
        hymn_id: hymn.id,
        url: publicUrl.publicUrl,
      });
    }
  }

  return NextResponse.json(
    customResponse({
      data: { hymn, media: mediaUrls },
      message: `${hymn.title} created successfully`,
    })
  );
}
