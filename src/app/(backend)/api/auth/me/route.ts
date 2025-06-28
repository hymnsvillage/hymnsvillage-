import { customResponse } from "@/app/(backend)/lib/customResponse";
import { updateMeSchema } from "@/app/(backend)/lib/validators/profileSchemas";
import { supabaseClient } from "@/supabase";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

function getMimeType(buffer: Buffer): string | null {
  // Basic PNG/JPEG/WebP magic number check
  if (
    buffer
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  )
    return "image/png";
  if (buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])))
    return "image/jpeg";
  if (
    buffer.subarray(0, 4).equals(Buffer.from([0x52, 0x49, 0x46, 0x46])) &&
    buffer.subarray(8, 12).equals(Buffer.from([0x57, 0x45, 0x42, 0x50]))
  )
    return "image/webp";
  return null;
}

export async function GET() {
  const { data, error } = await supabaseClient.supabase.auth.getUser();

  if (error || !data.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    customResponse({ statusCode: 200, data: { user: data.user } })
  );
}

export async function PUT(req: Request) {
  const supabase = supabaseClient.supabase;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = updateMeSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );

  let avatarUrl: string | undefined;
  if (parsed.data.avatarFile) {
    const buffer = Buffer.from(parsed.data.avatarFile, "base64");

    // File size validation
    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Avatar file size must be less than 3MB." },
        { status: 400 }
      );
    }

    // File type validation
    const mimeType = getMimeType(buffer);
    if (!mimeType || !ALLOWED_MIME_TYPES.includes(mimeType)) {
      return NextResponse.json(
        {
          error:
            "Invalid avatar file type. Only PNG, JPEG, and WEBP are allowed.",
        },
        { status: 400 }
      );
    }

    const ext = mimeType.split("/")[1];
    const path = `avatars/${user.id}/${uuidv4()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("avatars")
      .upload(path, buffer, { contentType: mimeType });
    if (upErr)
      return NextResponse.json({ error: upErr.message }, { status: 500 });
    const { data: publicUrl } = supabase.storage
      .from("avatars")
      .getPublicUrl(path);
    avatarUrl = publicUrl.publicUrl;
  }

  const updateData: Record<string, unknown> = {};
  if (parsed.data.name) updateData.name = parsed.data.name;
  if (avatarUrl) updateData.avatar_url = avatarUrl;

  const { error: profErr } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", user.id);
  if (profErr)
    return NextResponse.json({ error: profErr.message }, { status: 500 });

  return NextResponse.json(
    customResponse({
      message: "Profile updated successfully",
      data: { avatarUrl },
    })
  );
}
