"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  content: string;
  slug: string;
  featuredImage?: string;
  categories?: { id: number; name: string }[];
  author_name?: string;
  created_at: string;
}

export default function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const res = await fetch(
          "https://cms.hymnsvillage.com/wp-json/wp/v2/posts?_embed&per_page=6"
        );
        const data = await res.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blogs: Blog[] = data.map((post: any) => ({
          id: post.id,
          title: post.title.rendered,
          content: post.content.rendered,
          slug: post.slug,
          featuredImage:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/Rectangle 1 (1).png",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          categories: post._embedded?.["wp:term"]?.[0]?.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
          })),
          author_name: post._embedded?.author?.[0]?.name || "Author",
          created_at: post.date,
        }));

        setRecentPosts(blogs);
      } catch (error) {
        console.error("Failed to fetch recent posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white px-6 md:px-16">
        <h2 className="text-2xl font-semibold mb-6">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-xl h-80"
            ></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white px-6 md:px-16">
      <h2 className="text-2xl font-semibold mb-6">Recent Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentPosts.map((post) => {
          const imageUrl = post.featuredImage || "/Rectangle 1 (1).png";
          const categoryName = post.categories?.[0]?.name || "Technology";

          // Remove HTML tags from content and create short description
          const plainText = post.content.replace(/<[^>]+>/g, "");
          const description =
            plainText.length > 100
              ? plainText.substring(0, 100) + "..."
              : plainText;

          return (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                <div className="relative w-full h-48">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full inline-block">
                    {categoryName}
                  </span>
                  <h3 className="text-base font-semibold group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {post.author_name || "Author"} •{" "}
                    {new Date(post.created_at).toLocaleDateString()} • 5 min read
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
