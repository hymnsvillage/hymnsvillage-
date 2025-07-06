import {
    createSupabaseServerClient,
    customResponse,
} from "@/app/(backend)/lib";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("hymn_categories").select("*");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(customResponse({ data: { categories: data } }));
}
