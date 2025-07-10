import { createSupabaseServerClient } from "@/app/(backend)/lib";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("media") as File;
  const hymnId = formData.get("hymnId") as string;
  const type = formData.get("type") as "audio" | "video";

  if (!file || !hymnId || !type) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileName = `${hymnId}/${type}-${randomUUID()}.${file.name
    .split(".")
    .pop()}`;

  const { error } = await supabase.storage
    .from("hymn-media")
    .upload(fileName, buffer, {
      contentType: file.type,
    });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const mediaUrl = supabase.storage.from("hymn-media").getPublicUrl(fileName)
    .data.publicUrl;

  await supabase
    .from("hymns")
    .update({ [`${type}_url`]: mediaUrl })
    .eq("id", hymnId);

  return NextResponse.json({ url: mediaUrl, message: `${type} uploaded` });
}
