import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { commentInputSchema } from "@/app/(backend)/schemas/blogSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { postId: string } }
) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*, users(email)")
    .eq("post_id", params.postId)
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(customResponse({ data: { comments: data } }));
}

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = commentInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      content: parsed.data.content,
      post_id: params.postId,
      user_id: user.id,
    })
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(customResponse({ data: { comment: data } }));
}
