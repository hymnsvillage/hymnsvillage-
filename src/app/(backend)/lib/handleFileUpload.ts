/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";
import { createSupabaseServerClient } from "./supabase";

const DEFAULT_MAX_FILE_SIZE_MB = 10;

const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

export const ALLOWED_TYPES_MAP = {
  audio: ALLOWED_AUDIO_TYPES,
  video: ALLOWED_VIDEO_TYPES,
  image: ALLOWED_IMAGE_TYPES,
};

/**
 * Handles uploading a media file (audio, video, or image) to a Supabase storage bucket,
 * validates file type and size, and optionally inserts a record into a specified database table.
 *
 * @param params - The parameters for the media upload.
 * @param params.file - The media file to upload.
 * @param params.type - The type of media ("audio", "video", or "image").
 * @param params.id - The unique identifier associated with the upload (e.g., user or resource ID).
 * @param params.bucket - The Supabase storage bucket to upload the file to.
 * @param params.insertPayload - A function that generates the payload for database insertion, given the public URL.
 * @param params.table - (Optional) The database table to insert the record into.
 * @param params.maxFileSizeMB - (Optional) The maximum allowed file size in megabytes. Defaults to `DEFAULT_MAX_FILE_SIZE_MB`.
 * @throws Will throw an error if the file size exceeds the allowed limit.
 * @throws Will throw an error if the file type is not allowed.
 * @throws Will throw an error if the upload to Supabase storage fails.
 * @returns A promise that resolves when the upload (and optional database insertion) is complete.
 */
export async function handleMediaUpload({
  file,
  type,
  id,
  bucket,
  insertPayload,
  insertTable,
  maxFileSizeMB = DEFAULT_MAX_FILE_SIZE_MB,
}: {
  file: File;
  type: "audio" | "video" | "image";
  id: number | string;
  bucket: string;
  insertTable?: string;
  insertPayload?: (x: string) => Record<string, any>;
  maxFileSizeMB?: number;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const buffer = Buffer.from(await file.arrayBuffer());
  const sizeMB = buffer.length / (1024 * 1024);
  const allowedTypes = ALLOWED_TYPES_MAP[type];

  if (sizeMB > maxFileSizeMB) {
    throw new Error(`${type} file must be less than ${maxFileSizeMB}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      `Invalid ${type} type. Allowed: ${allowedTypes.join(", ")}`
    );
  }

  const ext =
    file.name.split(".").pop() ||
    (type === "audio" ? "mp3" : type === "video" ? "mp4" : "png");
  const filePath = `${user?.id}/${id}/${uuidv4()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  if (insertTable && insertPayload)
    await supabase.from(insertTable).insert(insertPayload(publicUrl.publicUrl));
}
