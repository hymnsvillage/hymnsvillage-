import {
    createSupabaseServerClient,
    customResponse,
} from "@/app/(backend)/lib";
import { notificationSchema } from "@/app/(backend)/schemas/settingsSchemas";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route GET /api/auth/settings/notifications
 * @description Get current user notification settings
 */
export async function GET() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = user.user_metadata?.notifications || {
    newsletter: true,
    app_updates: true,
    comments: true,
  };

  return NextResponse.json(customResponse({ data: settings }));
}

/**
 * @route PUT /api/auth/settings/notifications
 * @description Update user notification settings
 */
export async function PUT(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = notificationSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );

  const { error } = await supabase.auth.updateUser({
    data: {
      notifications: parsed.data,
    },
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    customResponse({ message: "Notification preferences updated" })
  );
}
