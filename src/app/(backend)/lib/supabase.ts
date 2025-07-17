import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const createSupabaseServerClient = () => {
  const cookieStore = cookies();
  return createRouteHandlerClient({
    cookies: () => cookieStore,
  });
};


