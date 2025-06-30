// app/api/auth/oauth/[provider]/route.ts

import { appUrl, supabaseClient } from "@/supabase";
import { Provider } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { provider: string } }
) {
    const { provider } = params;
    
  const {
    data: { url },
    error,
  } = await supabaseClient.supabase.auth.signInWithOAuth({
    provider: provider.toUpperCase() as Provider,
    options: { redirectTo: `${appUrl}/auth/callback` },
  });

  if (error || !url)
    return NextResponse.json({ error: error?.message }, { status: 400 });
  return NextResponse.redirect(url);
}
