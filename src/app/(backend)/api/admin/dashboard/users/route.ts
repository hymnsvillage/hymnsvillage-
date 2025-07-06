import {
  createSupabaseServerClient,
  customResponse,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from "@/app/(backend)/lib";
import { orderResponse } from "@/app/(backend)/lib/orderResponse";
import { requireAdmin } from "@/app/(backend)/middlewares/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route GET /api/admin/dashboard/users
 * @description Get all registered users
 * @access Admin only
 */
export async function GET(req: NextRequest) {
  //_: NextRequest
  const supabase = await createSupabaseServerClient();
  const { error: authError } = await requireAdmin(supabase);
  if (authError)
    return NextResponse.json({ error: authError }, { status: 403 });

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || `${DEFAULT_PAGE}`, 10);
  const limit = parseInt(searchParams.get("limit") || `${DEFAULT_LIMIT}`, 10);

  const { data, error } = await supabase.auth.admin.listUsers({
    page,
    perPage: limit,
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    customResponse({
      data: {
        users: data.users,
        pageInfo: orderResponse({ data: data?.users, limit, page }),
      },
    })
  );
}
