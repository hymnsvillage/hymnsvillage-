import { createSupabaseServerClient } from "@/app/(backend)/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { hymnId: string } }
) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("hymn_comments")
    .select("*")
    .eq("hymn_id", params.hymnId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comments: data });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { hymnId: string } }
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { content } = body;

  const { error } = await supabase.from("hymn_comments").insert({
    hymn_id: params.hymnId,
    user_id: user.id,
    content,
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Comment added" });
}
