import {
  createSupabaseServerClient,
  customResponse,
} from "@/app/(backend)/lib";
import { endOfWeek, formatISO, startOfWeek } from "date-fns";

/**
 * @route GET /api/user/dashboard/analytics
 * @description Weekly analytics (e.g., impressions/views)
 */
export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return customResponse({
      success: false,
      message: "Unauthorized",
      statusCode: 401,
    });
  }

  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });

  const { data, error } = await supabase
    .from("impressions")
    .select("id, created_at")
    .eq("viewer_id", user.id)
    .gte("created_at", formatISO(start))
    .lte("created_at", formatISO(end));

  if (error) {
    return customResponse({
      success: false,
      message: error.message,
      statusCode: 500,
    });
  }

  // Group by day (client can also handle)
  const dailyCounts: Record<string, number> = {};
  for (const entry of data || []) {
    const date = entry.created_at.split("T")[0];
    dailyCounts[date] = (dailyCounts[date] || 0) + 1;
  }

  return customResponse({
    data: { dailyCounts },
    message: "Weekly analytics fetched successfully",
    statusCode: 200,
  });
}
