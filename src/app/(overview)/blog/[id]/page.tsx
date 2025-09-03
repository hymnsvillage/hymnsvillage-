// app/blog/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  media: { url: string }[];  // ✅ updated (was blog_media)
  tags: { tag_id: string }[]; // ✅ added tags
  hasViewed: boolean; // ✅ added
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // ✅ Fetch single blog
  const res = await fetch(`${baseUrl}/api/blog/${id}`, { cache: "no-store" });
  if (!res.ok) return notFound();
  const blogRes = await res.json();
  const blog: Blog = blogRes.data;

  // ✅ Fetch all blogs
  const recentRes = await fetch(`${baseUrl}/api/blog`, { cache: "no-store" });
  const allBlogsRes = await recentRes.json();
  const allBlogs: Blog[] = allBlogsRes.data || [];
  const recentPosts = allBlogs.filter((b) => b.id !== id).slice(0, 3);

  if (!blog) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <article className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          {new Date(blog.created_at).toDateString()}
        </p>

        {blog.media?.[0]?.url && (
          <div className="mb-6">
            <Image
              src={blog.media[0].url}
              alt={blog.title}
              width={800}
              height={400}
              className="rounded-lg"
            />
          </div>
        )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      {/* Sidebar */}
      <aside className="space-y-8">
        {/* Recent Posts */}
        <div>
          <h3 className="font-semibold mb-2">Recent Posts</h3>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id} className="flex gap-3">
                <Image
                  src={post.media?.[0]?.url || "/placeholder.png"}
                  alt={post.title}
                  width={70}
                  height={70}
                  className="rounded object-cover"
                />
                <div>
                  <Link href={`/blog/${post.id}`} className="text-sm font-medium">
                    {post.title}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {new Date(post.created_at).toDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
