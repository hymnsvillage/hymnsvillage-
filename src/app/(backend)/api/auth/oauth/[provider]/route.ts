import { createSupabaseServerClient } from "@/app/(backend)/lib";
import { appUrl } from "@/supabase";
import { Provider } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const allowedProviders: Provider[] = ["google"];

export async function GET(
  _req: Request,
  { params }: { params: { provider: string } }
) {
  const provider = params.provider.toLowerCase();

  // Validate provider
  if (!allowedProviders.includes(provider as Provider)) {
    return NextResponse.json(
      { error: `Unsupported provider: ${provider}` },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServerClient();

  const {
    data: { url },
    error,
  } = await (await supabase).auth.signInWithOAuth({
    provider: provider.toUpperCase() as Provider,
    options: { redirectTo: `${appUrl}/auth/callback` },
  });

  if (error || !url)
    return NextResponse.json({ error: error?.message }, { status: 400 });

  return NextResponse.redirect(url);
}
