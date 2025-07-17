import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient, customResponse } from "../../lib";

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {} = await supabase.auth.getUser();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase().trim();
  const includeAdmins = searchParams.get("includeAdmins") === "true";

  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter `q`" },
      { status: 400 }
    );
  }

  const filters = (field: string) => `${field}.ilike.%${query}%`;

  const modules = {
    blogs: supabase
      .from("blogs")
      .select("id, title, content, created_at")
      .or(`${filters("title")},${filters("content")}`),

    blog_categories: supabase
      .from("blog_categories")
      .select("*")
      .ilike("name", `%${query}%`),

    blog_comments: supabase
      .from("blog_comments")
      .select("*")
      .ilike("content", `%${query}%`),

    blog_tags: supabase
      .from("blog_tags")
      .select("*")
      .ilike("name", `%${query}%`),

    hymns: supabase
      .from("hymns")
      .select("*")
      .or(`${filters("title")},${filters("lyrics")}`),

    hymn_categories: supabase
      .from("hymn_categories")
      .select("*")
      .ilike("name", `%${query}%`),

    users: supabase
      .from("users")
      .select("id, name, email, username, userRole")
      .or(`${filters("name")},${filters("email")},${filters("username")}`)
      .neq("userRole", includeAdmins ? "none" : "admin"),
  };

  const results = await Promise.all(
    Object.entries(modules).map(async ([key, query]) => {
      const { data, error } = await query.limit(10);
      return [key, error ? null : data?.length ? data : null];
    })
  );

  const groupedResults = Object.fromEntries(results);

  return NextResponse.json(
    customResponse({
      data: { ...groupedResults },
    })
  );
}
