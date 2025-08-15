import {
  createSupabaseServerClient,
  customResponse,
} from "@/app/(backend)/lib";
import { hymnUpdateSchema } from "@/app/(backend)/schemas/hymnSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: user } = await supabase.auth.getUser();

  const [{ data, error }, { data: impressions }] = await Promise.all([
    supabase.from("hymns").select("*, categories(*)").eq("id", id).single(),
    supabase
      .from("impressions")
      .select("id")
      .eq("target_type", "hymn")
      .eq("target_id", id)
      .eq("viewer_id", user.user?.id || "")
      .maybeSingle(),
  ]);

  const hasViewed = !!impressions;

  if (error)
    return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(customResponse({ data: { ...data, hasViewed } }));
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = hymnUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("hymns")
    .update(parsed.data)
    .eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Hymn updated" });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error } = await supabase.from("hymns").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Hymn deleted" });
}
