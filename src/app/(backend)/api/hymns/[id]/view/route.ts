import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route POST /api/blog/:id/view
 * @description Record a view for a blog
 * @access Public (authenticated or not)
 */
export async function POST(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("impressions").insert({
    target_type: "hymn",
    target_id: params.id,
    viewer_id: user?.id ?? null,
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(customResponse({ message: "View recorded" }));
}
