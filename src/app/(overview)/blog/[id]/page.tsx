// app/blog/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Fetch single blog
  const res = await fetch(`${baseUrl}/api/blog/${id}`, { cache: "no-store" });
  if (!res.ok) return notFound();
  const blogRes = await res.json();
  const blog: Blog = blogRes.data;

  if (!blog) return notFound();

  // Fetch recent blogs
  const recentRes = await fetch(`${baseUrl}/api/blog/recent`, { cache: "no-store" });
  const allBlogsRes = await recentRes.json();
  const blogsArray = Array.isArray(allBlogsRes?.data?.blogs)
    ? allBlogsRes.data.blogs
    : [];
  const recentPosts = blogsArray.filter((b: { id: string; }) => b.id !== id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main Content */}
      <article className="lg:col-span-2">
        {/* Tag */}
        {blog.tags?.[0] && (
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
            {blog.tags[0].name || "Inspiration"}
          </span>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 leading-snug">{blog.title}</h1>

        {/* Author meta */}
        <div className="flex items-center gap-4 mb-8">
          <Image
            src={blog.author?.avatar || "/placeholder.png"}
            alt={blog.author?.name || "Author"}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-medium">{blog.author?.name || "Author's Name"}</span>
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
        {blog.media?.[0]?.url && (
          <div className="mb-10">
            <Image
              src={blog.media[0].url}
              alt={blog.title}
              width={1200}
              height={600}
              className="rounded-2xl w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-semibold prose-p:text-gray-700"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      {/* Sidebar */}
      <aside className="space-y-10">
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
        <div>
          <h3 className="font-semibold mb-4 text-lg">Recent post</h3>
          <ul className="space-y-4">
            {recentPosts.map((post: Blog) => (
              <li key={post.id} className="flex gap-3">
                <Image
                  src={post.media?.[0]?.url || "/placeholder.png"}
                  alt={post.title}
                  width={80}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-sm font-medium hover:underline"
                  >
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

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Our socials</h3>
          <div className="flex gap-4 text-xl text-gray-600">
            <Link href="#"><i className="ri-facebook-circle-line"></i></Link>
            <Link href="#"><i className="ri-instagram-line"></i></Link>
            <Link href="#"><i className="ri-youtube-line"></i></Link>
            <Link href="#"><i className="ri-twitter-x-line"></i></Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
