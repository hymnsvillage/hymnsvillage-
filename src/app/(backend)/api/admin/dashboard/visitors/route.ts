import { createSupabaseServerClient, customResponse } from "@/app/(backend)/lib";
import { requireAdmin } from "@/app/(backend)/middlewares/auth";
import { NextResponse } from "next/server";

/**
 * @route GET /api/admin/dashboard/visitors
 * @description Get daily visitor counts for the current month
 * @access Admin only
 */
export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { error: authError } = await requireAdmin(supabase);

  if (authError) {
    return NextResponse.json({ error: authError }, { status: 403 });
  }

  const { data, error } = await supabase.rpc("get_daily_visitors"); // define this RPC function

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(customResponse({ data }));
}
