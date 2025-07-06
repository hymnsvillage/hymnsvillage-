import { createSupabaseServerClient } from "@/app/(backend)/lib";
import { hymnSearchSchema } from "@/app/(backend)/schemas/hymnSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();

  const parsed = hymnSearchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { title, author, number, language, lyrics } = parsed.data;

  let query = supabase.from("hymns").select("*");

  if (title) query = query.ilike("title", `%${title}%`);
  if (author) query = query.ilike("author", `%${author}%`);
  if (number) query = query.eq("number", number);
  if (lyrics) query = query.ilike("lyrics", `%${lyrics}%`);
  if (language) query = query.eq("language", language);

  const { data, error } = await query;
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ hymns: data });
}
