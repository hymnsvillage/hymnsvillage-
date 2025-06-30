/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSupabaseServerClient } from "@/app/(backend)/lib";
import { File, IncomingForm } from "formidable";
import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = async (req: Request): Promise<File[]> =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true, maxFiles: 10 });
    form.parse(req as any, (err, _fields, files) => {
      if (err) reject(err);
      const media = files.media;
      const mediaFiles = Array.isArray(media) ? media : media ? [media] : [];
      resolve(mediaFiles);
    });
  });

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const files = await parseForm(req);

  if (files.length > 10) {
    return NextResponse.json(
      { error: "You can upload a maximum of 10 images." },
      { status: 400 }
    );
  }

  const uploadedUrls: string[] = [];

  for (const file of files) {
    const buffer = await readFile(file.filepath);
    const sizeMB = buffer.length / (1024 * 1024);
    if (sizeMB > 3) continue;

    const ext = file.originalFilename?.split(".").pop() || "jpg";
    const filePath = `${user.id}/${uuidv4()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-media")
      .upload(filePath, buffer, {
        contentType: file.mimetype || "image/jpeg",
        upsert: true,
      });

    if (!uploadError) {
      const { data: publicUrl } = supabase.storage
        .from("blog-media")
        .getPublicUrl(filePath);
      uploadedUrls.push(publicUrl.publicUrl);
    }
  }

  return NextResponse.json({
    message: `${uploadedUrls.length} image(s) uploaded`,
    urls: uploadedUrls,
  });
}
