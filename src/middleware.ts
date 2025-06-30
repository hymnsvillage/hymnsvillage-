import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "./app/(backend)/lib";


export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/auth/me")) {
   const supabase = createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      return new NextResponse("You are not authorized", { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
     "/api/auth/me/:path*",
    "/api/auth/logout",
    "/api/auth/profile",
    "/api/auth/change-password",
    "/api/blog/:path*",
  ],
};
