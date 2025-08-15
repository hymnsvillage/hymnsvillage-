import { createSupabaseServerClient } from "@/app/(backend)/lib";
import { appUrl } from "@/supabase";
import { Provider } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const allowedProviders: Provider[] = ["google"];

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  const provider = (await params).provider.toLowerCase();

  // Validate provider
  if (!allowedProviders.includes(provider as Provider)) {
    return NextResponse.json(
      { error: `Unsupported provider: ${provider}` },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: provider.toUpperCase() as Provider,
    options: { redirectTo: `${appUrl}/auth/callback` },
  });

  if (error || !url)
    return NextResponse.json({ error: error?.message }, { status: 400 });

  return NextResponse.redirect(url);
}
