/**
 * @route POST /api/auth/logout
 * @description Logs out the currently authenticated user.
 * @returns {200} Logout success
 * @returns {500} Logout error
 */

import { customResponse } from "@/app/(backend)/lib/customResponse";
import { supabaseClient } from "@/supabase";
import { NextResponse } from "next/server";

export async function POST() {
  const { error } = await supabaseClient.supabase.auth.signOut();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json( customResponse({ message: "Logged out successfully", statusCode:200}));
}
