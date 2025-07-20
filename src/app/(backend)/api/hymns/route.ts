import {
  createSupabaseServerClient,
  customResponse,
} from "@/app/(backend)/lib";
import { hymnCreateSchema } from "@/app/(backend)/schemas/hymnSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("hymns")
    .select("*, categories(*)")
    .order("number", { ascending: true });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(customResponse({ data: { hymns: data } }));
}

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = hymnCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { data: hymn, error } = await supabase
    .from("hymns")
    .insert(parsed.data)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    customResponse({ data: { hymn }, message: "Hymn created" })
  );
}
