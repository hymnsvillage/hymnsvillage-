// src/app/(overview)/blog/[id]/page.tsx
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  blog_media: { url: string }[];
  categories: { name: string }[];
  tags: { name: string }[];
}

async function getBlog(id: string): Promise<Blog> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/${id}`, {
  cache: "no-store",
});


  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  const { data } = await res.json();
  return data;
}

async function getRecentBlogs(): Promise<Blog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/recent`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recent blogs");
  }

  const { data } = await res.json();
  return data;
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  // ✅ Run both in parallel
  const [blog, recentPosts] = await Promise.all([
    getBlog(params.id),
    getRecentBlogs(),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {/* Meta */}
      <p className="text-gray-500 text-sm mb-6">
        {new Date(blog.created_at).toLocaleDateString()} ·{" "}
        {blog.categories.map((c) => c.name).join(", ")}
      </p>

      {/* Featured Images */}
      {blog.blog_media?.length > 0 && (
        <div className="mb-6">
          {blog.blog_media.map((media, idx) => (
            <Image
              key={idx}
              src={media.url}
              alt={blog.title}
              width={800}
              height={400}
              className="rounded-lg w-full object-cover mb-4"
            />
          ))}
        </div>
      )}

      {/* Blog Content */}
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Recent Posts Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li key={post.id} className="border-b pb-2">
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
