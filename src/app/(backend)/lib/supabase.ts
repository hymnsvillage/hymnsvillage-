import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies as getCookies } from "next/headers";

export const createSupabaseServerClient = () => {
  const cookieStore =cookies ();
  return createRouteHandlerClient({ cookies: () => cookieStore }); // ✅ pass as function
};
// export const supabase = createSupabaseServerClient()