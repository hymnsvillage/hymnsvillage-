import {
    createSupabaseServerClient,
    customResponse,
} from "@/app/(backend)/lib";
import { requireAdmin } from "@/app/(backend)/middlewares/auth";
import { NextResponse } from "next/server";

/**
 * @route GET /api/admin/dashboard/overview
 * @description Get total counts of blogs, hymns, users, and visitors
 * @access Admin only
 */
export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { error: authError } = await requireAdmin(supabase);

  if (authError) {
    return NextResponse.json({ error: authError }, { status: 403 });
  }

  const [blogs, hymns, users] = await Promise.all([
    supabase.from("blogs").select("id", { count: "exact", head: true }),
    supabase.from("hymns").select("id", { count: "exact", head: true }),
    supabase.auth.admin.listUsers(), // paginate or cache in real use
    // supabase.from("visitors").select("id", { count: "exact", head: true }),
  ]);

  return NextResponse.json(
    customResponse({
      data: {
        blogCount: blogs.count || 0,
        hymnCount: hymns.count || 0,
        userCount: users.data?.users?.length || 0,
        // visitorCount: visitors.count || 0,
      },
    })
  );
}
