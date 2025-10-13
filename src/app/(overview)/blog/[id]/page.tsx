// app/blog/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  media: { url: string }[];
  tags: { tag_id: string; name?: string }[];
  author?: {
    name: string;
    avatar: string;
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

  // ✅ Fetch single blog
  const res = await fetch(`${baseUrl}/api/blog/${id}`, { cache: "no-store" });
  if (!res.ok) return notFound();

  const blogRes = await res.json();
  const blog: Blog = blogRes.data;
  if (!blog) return notFound();

  // ✅ Fetch recent blogs
  const recentRes = await fetch(`${baseUrl}/api/blog/recent`, { cache: "no-store" });
  const allBlogsRes = await recentRes.json();

  const blogsArray = Array.isArray(allBlogsRes?.data?.blogs)
    ? allBlogsRes.data.blogs
    : [];

  const recentPosts = blogsArray.filter((b: { id: string }) => b.id !== id).slice(0, 4);
  const featuredImageUrl = blog.media?.[0]?.url || "/Rectangle 1 (1).png";

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* ----------- MAIN ARTICLE ----------- */}
      <article className="lg:col-span-2 space-y-8">
        {/* Tag */}
        {blog.tags?.[0] && (
          <span className="inline-block px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
            {blog.tags[0].name || "Inspiration"}
          </span>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold leading-snug">{blog.title}</h1>

        {/* Author Meta */}
        <div className="flex items-center gap-4">
          <Image
            src={blog.author?.avatar || "/placeholder.png"}
            alt={blog.author?.name || "Author"}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{blog.author?.name || "Author's Name"}</p>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <span>{new Date(blog.created_at).toDateString()}</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>
          <div className="ml-auto flex gap-3 text-gray-500">
            <Link href="#" aria-label="Twitter">
              <i className="ri-twitter-x-line text-xl"></i>
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <i className="ri-linkedin-box-line text-xl"></i>
            </Link>
            <button aria-label="Copy link">
              <i className="ri-link text-xl"></i>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mt-4">
          <Image
            src={featuredImageUrl}
            alt={blog.title}
            width={1200}
            height={600}
            className="w-full rounded-2xl object-cover"
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-semibold prose-p:text-gray-700"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      {/* ----------- SIDEBAR ----------- */}
      <aside className="space-y-12">
        {/* Author Card */}
        <div className="p-6 bg-gray-50 rounded-2xl text-center">
          <Image
            src={blog.author?.avatar || "/placeholder.png"}
            alt="Author"
            width={80}
            height={80}
            className="rounded-full mx-auto mb-3"
          />
          <h3 className="font-semibold">{blog.author?.name || "Author's Name"}</h3>
          <p className="text-sm text-gray-500">Content Writer</p>
        </div>

        {/* Recent Posts */}
        <div className="space-y-4">
          {recentPosts.map((article: Blog) => {
            const imageUrl = article.media?.[0]?.url || "/Rectangle 1 (1).png";
            return (
              <Link
                key={article.id}
                href={`/blog/${article.id}`}
                className="flex items-start gap-4 pb-4 border-b border-gray-200"
              >
                <div className="w-16 h-16 relative rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full inline-block mb-1">
                    {article.tags?.[0]?.name || "General"}
                  </span>
                  <h4 className="text-sm font-semibold text-black">{article.title}</h4>
                  <p className="text-xs text-gray-500">
                    {article.author?.name || "Author"} •{" "}
                    {new Date(article.created_at).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Social Links */}
        <div className="pt-6">
          <SocialLinks />
        </div>
      </aside>
    </div>
  );
}
