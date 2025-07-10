import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

export const createSupabaseServerClient = () => {
  const cookieStore =cookies ();
  return createRouteHandlerClient({ cookies: () => cookieStore }); // ✅ pass as function
};

function cookies() {
  throw new Error("Function not implemented.");
}
// export const supabase = createSupabaseServerClient()