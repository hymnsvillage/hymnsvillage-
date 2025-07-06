import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies as getCookies } from "next/headers";

export async function createSupabaseServerClient() {
  return createRouteHandlerClient({ 
    cookies: () => Promise.resolve(getCookies())
  });
}
// export const supabase = await createSupabaseServerClient();
