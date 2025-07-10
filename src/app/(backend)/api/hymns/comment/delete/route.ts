import { createSupabaseServerClient } from "@/app/(backend)/lib";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: comment } = await supabase
    .from("hymn_comments")
    .select("user_id")
    .eq("id", params.commentId)
    .single();

  const isOwner = user?.id === comment?.user_id;
  const isAdmin = user?.user_metadata?.role === "admin";

  if (!isOwner && !isAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { error } = await supabase
    .from("hymn_comments")
    .delete()
    .eq("id", params.commentId);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Comment deleted" });
}
