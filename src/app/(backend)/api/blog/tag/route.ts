import {
  createSupabaseServerClient,
  customResponse,
} from "@/app/(backend)/lib";
import { cleanUser, RawUser } from "@/app/(backend)/lib/cleanUser";
import { tagInputSchema } from "@/app/(backend)/schemas/blogSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("blog_tags").select("*");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(customResponse({ data: { tags: data } }));
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || cleanUser(user as RawUser)?.userRole !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = tagInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("blog_tags")
    .insert(parsed.data)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    customResponse({ data: { tag: data }, message: "Tag created successfully" })
  );
}
