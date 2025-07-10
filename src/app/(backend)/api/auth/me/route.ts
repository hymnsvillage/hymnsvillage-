import { createSupabaseServerClient } from "@/app/(backend)/lib";
import { cleanUser, RawUser } from "@/app/(backend)/lib/cleanUser";
import { customResponse } from "@/app/(backend)/lib/customResponse";
import { NextRequest, NextResponse } from "next/server";
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
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = data.user;

  const [followers, following] = await Promise.all([
    supabase
      .from("followers")
      .select("*", { count: "exact", head: true })
      .eq("followed_id", user.id),
    supabase
      .from("followers")
      .select("*", { count: "exact", head: true })
      .eq("follower_id", user.id),
  ]);

  return NextResponse.json(
    customResponse({
      data: { ...cleanUser(user as RawUser), followers, following },
    })
  );
}

export async function PUT(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();

  const name = formData.get("name")?.toString();
  const userRole = formData.get("userRole")?.toString();
  const avatarFile = formData.get("avatar") as File | null;

  let avatarUrl: string | undefined;

  if (avatarFile) {
    const buffer = Buffer.from(await avatarFile.arrayBuffer());
    const sizeMB = buffer.length / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Avatar file must be less than 3MB" },
        { status: 400 }
      );
    }

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
    const path = `${user.id}/${uuidv4()}.${ext}`;

    const existingAvatarUrl = user.user_metadata?.avatarUrl;
    if (
      existingAvatarUrl?.includes(
        "supabase.co/storage/v1/object/public/avatars"
      )
    ) {
      const url = new URL(existingAvatarUrl);
      const pathToDelete = url.pathname.split("/avatars/")[1]; // get path after /avatars/

      if (pathToDelete) {
        await supabase.storage.from("avatars").remove([pathToDelete]);
      }
    }

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, buffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrl } = supabase.storage
      .from("avatars")
      .getPublicUrl(path);

    avatarUrl = publicUrl.publicUrl;
  }

  // Construct profile update object
  const updateData: Record<string, unknown> = {};
  if (name) updateData.name = name;
  if (userRole) updateData.userRole = userRole;
  if (avatarUrl) updateData.avatarUrl = avatarUrl;

  const { error: updateError } = await supabase.auth.updateUser({
    data: updateData,
  });

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json(
    customResponse({
      message: "Profile updated successfully",
      data: { avatarUrl },
    })
  );
}
