import { client } from "@/lib";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  blog_media: { url: string }[];
  blog_categories: { name: string };
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // ✅ Axios GET request
  const res = await client.get(`/blog/${id}`);
  console.log("Blog API response:", res.data);

  // ✅ Handle customResponse wrapper or direct data
  const post: Blog = res.data.data || res.data;

  // ✅ Fetch recent posts (using fetch, since it's from another endpoint)
  const recentRes = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/blog/recent`,
    { cache: "no-store" }
  );
  const recentJson = await recentRes.json();
  const recentPosts: Blog[] = recentJson?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-10">
      {/* LEFT: Blog content */}
      <article className="lg:col-span-2">
        {/* Category */}
        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
          {post.blog_categories?.name}
        </span>

        {/* Title */}
        <h1 className="mt-4 text-4xl font-bold">{post.title}</h1>

        {/* Meta info */}
        <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
          <span>
            Published • {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>

        {/* Featured Image */}
        {post.blog_media?.length > 0 && (
          <div className="my-6">
            <Image
              src={post.blog_media[0].url}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        {/* Blog body */}
        <div
          className="mt-8 prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* RIGHT: Sidebar */}
      <aside className="space-y-8">
        {/* Author Card – placeholder */}
        <div className="bg-gray-50 p-6 rounded-xl text-center">
          <Image
            src={post.blog_media?.[0]?.url || "/placeholder.jpg"}
            alt={post.title}
            width={80}
            height={80}
            className="rounded-full mx-auto"
          />
          <h3 className="mt-4 font-semibold">Author Name</h3>
          <p className="text-sm text-gray-500">Author bio goes here</p>
        </div>

        {/* Recent Posts */}
        <div>
          <h3 className="font-bold mb-4">Recent posts</h3>
          <ul className="space-y-4">
            {recentPosts.map((r) => (
              <li key={r.id} className="flex items-center gap-4">
                <Image
                  src={r.blog_media?.[0]?.url || "/placeholder.jpg"}
                  alt={r.title}
                  width={70}
                  height={50}
                  className="rounded-lg object-cover"
                />
                <Link
                  href={`/blog/${r.id}`}
                  className="text-sm font-medium hover:underline"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-bold mb-4">Our socials</h3>
          <div className="flex gap-3">
            <Link
              href="https://facebook.com"
              className="text-gray-500 hover:text-gray-900"
            >
              FB
            </Link>
            <Link
              href="https://twitter.com"
              className="text-gray-500 hover:text-gray-900"
            >
              TW
            </Link>
            <Link
              href="https://instagram.com"
              className="text-gray-500 hover:text-gray-900"
            >
              IG
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
