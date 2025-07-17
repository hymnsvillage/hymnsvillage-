import {
  createSupabaseServerClient,
  customResponse,
} from "@/app/(backend)/lib";
import { cleanUser, RawUser } from "@/app/(backend)/lib/cleanUser";
import { categoryInputSchema } from "@/app/(backend)/schemas/blogSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("hymn_categories").select("*");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(customResponse({ data: { categories: data } }));
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: userError?.message }, { status: 500 });
  }

  if (!user || cleanUser(user as RawUser)?.userRole !== "admin") {
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
    .from("hymn_categories")
    .insert(parsed.data)
    .select()
    .single();

  if (insertError)
    return NextResponse.json({ error: insertError.message }, { status: 500 });

  return NextResponse.json(
    customResponse({
      data,
      message: "Category created successfully",
    })
  );
}
