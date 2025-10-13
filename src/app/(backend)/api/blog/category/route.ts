import {
  createSupabaseServerClient,
  customResponse,
} from "@/app/(backend)/lib";

import { categoryInputSchema } from "@/app/(backend)/schemas/blogSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("blog_categories").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // ✅ return directly using customResponse (not wrapped again in NextResponse.json)
  return customResponse({
    data: { categories: data },
    message: "Categories fetched successfully",
  });
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = categoryInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { error: insertError, data } = await supabase
    .from("blog_categories")
    .insert(parsed.data)
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return customResponse({
    data,
    message: "Category created successfully",
  });
}
