import { createSupabaseServerClient } from "../../lib";

export async function requireAdmin(
  supabase: ReturnType<typeof createSupabaseServerClient>
) {
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user || user.user_metadata?.role !== "admin") {
    return { user: null, error: "Admin access only" };
  }

  return { user };
}
