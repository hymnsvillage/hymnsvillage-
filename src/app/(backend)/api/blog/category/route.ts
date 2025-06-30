import {
  createSupabaseServerClient,
  customResponse,
} from "@/app/(backend)/lib";
import { categoryInputSchema } from "@/app/(backend)/schemas/blogSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("categories").select("*");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(customResponse({ data: { categories: data } }));
}

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== "admin") {
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
    .from("categories")
    .insert(parsed.data)
    .select()
    .single();

  if (insertError)
    return NextResponse.json({ error: insertError.message }, { status: 500 });

  return NextResponse.json(
    customResponse({
      data: { category: data },
      message: "Category created successfully",
    })
  );
}
