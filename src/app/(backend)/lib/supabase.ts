import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies as getCookies, getCookies as getCookiesAsync } from "next/headers";

// Unified version: supports both sync and async contexts
export const createSupabaseServerClient = async () => {
  try {
    // Try sync cookies() (works in route handlers and middleware)
    const cookieStore = getCookies(); // call cookies()
    return createRouteHandlerClient({
      cookies: () => cookieStore,
    });
  } catch (err) {
    // Fallback to async getCookies() if cookies() fails (e.g. in edge environments)
    const cookieStore = await getCookiesAsync();
    return createRouteHandlerClient({
      cookies: () => cookieStore,
    });
  }
};
