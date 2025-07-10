import {
    createSupabaseServerClient,
    customResponse,
} from "@/app/(backend)/lib";
import { endOfWeek, formatISO, startOfWeek } from "date-fns";
import { NextResponse } from "next/server";

/**
 * @route GET /api/user/dashboard/analytics
 * @description Weekly analytics (e.g., impressions/views)
 */
export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });

  const { data, error } = await supabase
    .from("blog_impressions")
    .select("id, created_at")
    .eq("author_id", user.id)
    .gte("created_at", formatISO(start))
    .lte("created_at", formatISO(end));

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  // Group by day (client can also handle)
  const dailyCounts: Record<string, number> = {};
  for (const entry of data || []) {
    const date = entry.created_at.split("T")[0];
    dailyCounts[date] = (dailyCounts[date] || 0) + 1;
  }

  return NextResponse.json(customResponse({ data: { dailyCounts } }));
}
