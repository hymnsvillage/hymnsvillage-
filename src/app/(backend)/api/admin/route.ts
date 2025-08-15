import { NextResponse } from "next/server";
import { createSupabaseServerClient, customResponse } from "../../lib";

export const POST = async () => {
  try {
    const supabase = createSupabaseServerClient();
    await (
      await supabase
    ).auth.admin.createUser({
      email: "admin@hymnsvillage.com",
      password: "StrongPassword123!",
      email_confirm: true,
    });

    return NextResponse.json(
      customResponse({
        statusCode: 200,
        message: "Admin created successfully",
      })
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      customResponse({
        statusCode: 200,
        message: "Failed to create an admin",
      })
    );
  }
};
