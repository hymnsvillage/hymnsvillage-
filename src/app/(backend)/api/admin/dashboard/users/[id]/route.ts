import {
  createSupabaseServerClient,
  customResponse,
} from "@/app/(backend)/lib";
import { requireAdmin } from "@/app/(backend)/middlewares/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const supabase = await createSupabaseServerClient();
  const { error: authError } = await requireAdmin(supabase);
  if (authError)
    return NextResponse.json({ error: authError }, { status: 403 });

  const { data, error } = await supabase.auth.admin.getUserById(id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 404 });

  const user = data.user;

  const [followers, following] = await Promise.all([
    supabase
      .from("followers")
      .select("*", { count: "exact", head: true })
      .eq("followed_id", user.id),
    supabase
      .from("followers")
      .select("*", { count: "exact", head: true })
      .eq("follower_id", user.id),
  ]);

  return NextResponse.json(
    customResponse({ data: { user, followers, following } })
  );
}
