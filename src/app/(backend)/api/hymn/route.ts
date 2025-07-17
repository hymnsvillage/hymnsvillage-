/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createSupabaseServerClient,
  customResponse,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from "@/app/(backend)/lib";
import { hymnCreateSchema } from "@/app/(backend)/schemas/hymnSchemas";
import { NextRequest, NextResponse } from "next/server";

import { cleanUser, RawUser } from "../../lib/cleanUser";
import { handleMediaUpload } from "../../lib/handleFileUpload";
import { orderResponse } from "../../lib/orderResponse";

export async function GET(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const { data: user } = await supabase.auth.getUser();

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || `${DEFAULT_PAGE}`, 10);
  const limit = parseInt(searchParams.get("limit") || `${DEFAULT_LIMIT}`, 10);
  const offset = (page - 1) * limit;

  const { data, error } = await supabase
    .from("hymns")
    .select("*, hymn_categories(*), hymn_media(id, url, type)")
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
      data: { ...orderResponse({ page, limit, data: hymns }), hymns },
    })
  );
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: userError?.message }, { status: 500 });
  }
  if (cleanUser(user as RawUser)?.userRole !== "admin") {
    return NextResponse.json({ error: "Admin access only" }, { status: 403 });
  }

  const formData = await req.formData();

  const title = formData.get("title")?.toString() || "";
  const lyrics = formData.get("lyrics")?.toString() || "";
  const author = formData.get("author")?.toString() || "";
  const number = parseInt(formData.get("number")?.toString() || "0", 10);
  const category_id = formData.get("category_id")?.toString() || "";
  const language = formData.get("language")?.toString() || "English";

  const parsed = hymnCreateSchema.safeParse({
    title,
    lyrics,
    author,
    number,
    language,
    category_id,
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

  const medias: Record<string, string> = {};

  const audioFile = formData.get("audio_url") as File | null;
  const videoFile = formData.get("video_url") as File | null;

  try {
    const mediaFiles = [
      { file: audioFile, type: "audio" },
      { file: videoFile, type: "video" },
    ];

    for (const { file, type } of mediaFiles) {
      if (file) {
        await handleMediaUpload({
          file,
          type: type as any,
          id: hymn.id,
          bucket: "hymn-media",
          insertPayload: (publicUrl) => {
            medias[type] = publicUrl;
            return {
              hymn_id: hymn.id,
              url: publicUrl,
              type,
            };
          },
          insertTable: "hymn_media",
        });
      }
    }
  } catch (error: any) {
    await supabase.from("hymns").delete().eq("id", hymn.id);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    customResponse({
      data: { ...hymn, ...medias },
      message: `${hymn.title} was created successfully`,
    })
  );
}
