import {
  createSupabaseServerClient,
  customResponse,
} from "@/app/(backend)/lib";
import { requireAdmin } from "@/app/(backend)/middlewares/auth";
import { updateMeSchema } from "@/app/(backend)/schemas/profileSchemas";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route GET /api/admin/dashboard/users/[id]
 * @description Fetch details of a specific user
 * @access Admin only
 */
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServerClient();
  const { error: authError } = await requireAdmin(supabase);
  if (authError)
    return NextResponse.json({ error: authError }, { status: 403 });

  const { data, error } = await supabase.auth.admin.getUserById(params.id);

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

/**
 * @route PUT /api/admin/dashboard/users/[id]
 * @description Update a user's metadata or ban status
 * @access Admin only
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServerClient();
  const { error: authError } = await requireAdmin(supabase);
  if (authError)
    return NextResponse.json({ error: authError }, { status: 403 });

  const body = await req.json();
  const parsed = updateMeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, avatarFile } = parsed.data;

  // if (ban !== undefined) {
  //   if (ban) await supabase.auth.admin.disableUser(params.id);
  //   else await supabase.auth.admin.enableUser(params.id);
  // }

  if (parsed.data) {
    await supabase.auth.admin.updateUserById(params.id, {
      user_metadata: { name, avatarFile },
    });
  }

  return NextResponse.json(
    customResponse({ message: "User updated successfully" })
  );
}

/**
 * @route DELETE /api/admin/dashboard/users/[id]
 * @description Permanently delete a user's account
 * @access Admin only
 */
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServerClient();
  const { error: authError } = await requireAdmin(supabase);
  if (authError)
    return NextResponse.json({ error: authError }, { status: 403 });

  const { error } = await supabase.auth.admin.deleteUser(params.id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    customResponse({ message: "User deleted successfully" })
  );
}
