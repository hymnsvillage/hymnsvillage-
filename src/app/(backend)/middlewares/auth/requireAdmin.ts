/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from "@supabase/supabase-js";

export async function requireAdmin(supabase: SupabaseClient<any, "public", any>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.userRole !== "admin") {
    return { user: null, error: "Admin access only" };
  }

  return { user };
}
