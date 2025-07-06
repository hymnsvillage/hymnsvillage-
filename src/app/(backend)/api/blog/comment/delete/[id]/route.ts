import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: comment } = await supabase
    .from("comments")
    .select("user_id")
    .eq("id", params.id)
    .single();

  const isOwner = user.id === comment?.user_id;
  const isAdmin = user.user_metadata?.role === "admin";

  if (!isOwner && !isAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", params.id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(customResponse({ message: "Comment deleted" }));
}
