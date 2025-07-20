import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("name");

  if (!category) {
    return NextResponse.json(
      { error: "Category name required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("hymns")
    .select("*")
    .eq("category_name", category);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(customResponse({ data: { hymns: data } }));
}
