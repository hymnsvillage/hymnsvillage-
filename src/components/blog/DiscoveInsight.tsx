"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
  id: string;
  title: string;
  content: string;
  category_id: string;
  slug: string;
  blog_media: Array<{ url: string }>;
  blog_categories: { name: string };
  created_at: string;
  author_name?: string;
}

interface BlogCardProps {
  article: Blog;
}

function BlogCard({ article }: BlogCardProps) {
  const imageUrl = article.blog_media?.[0]?.url || "/Rectangle 1 (1).png";
  const categoryName = article.blog_categories?.name || "Technology";

  // Convert HTML content to plain text and trim
  const plainText = article.content?.replace(/<[^>]+>/g, "") || "";
  const description =
    plainText.length > 100
      ? plainText.substring(0, 100) + "..."
      : plainText;

  return (
    <Link href={`/blog/${article.slug}`} className="group">
      <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
        <div className="relative w-full h-40">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
            {categoryName}
          </span>
        </div>
        <div className="p-3 space-y-1">
          <h3 className="text-sm font-semibold text-black leading-snug group-hover:underline">
            {article.title}
          </h3>
          <p className="text-xs text-gray-600">{description}</p>
          <p className="text-xs text-black">
            {article.author_name || "Author"} •{" "}
            {new Date(article.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function DiscoverInsights() {
  const [articles, setArticles] = useState<Blog[]>([]);
  const [recent, setRecent] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsightBlogs() {
      try {
        const res = await fetch("/api/blog/recent");
        const result = await res.json();

        if (result.success && result.data.blogs.length > 0) {
          const blogs = result.data.blogs;
          setArticles(blogs.slice(3, 8));
          setRecent(blogs.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch insight blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInsightBlogs();
  }, []);

  if (loading) {
    return (
      <section className="bg-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Discover New Insights.</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse rounded-xl h-64"
                ></div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse rounded-xl h-64"
                ></div>
              ))}
            </div>
          </div>
          <div className="bg-gray-200 animate-pulse rounded-xl h-96"></div>
        </div>
      </section>
    );
  }

  const topRow = articles.slice(0, 2);
  const bottomRow = articles.slice(2, 5);

  return (
    <section className="bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">Discover New Insights.</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-4">
          {/* Top Row (2 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topRow.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>

          {/* Bottom Row (3 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {bottomRow.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Sidebar Recent Posts */}
        <div className="space-y-4">
          {recent.map((article) => {
            const imageUrl =
              article.blog_media?.[0]?.url || "/Rectangle 1 (1).png";
            const categoryName =
              article.blog_categories?.name || "General";

            return (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="flex items-start gap-5 pb-4 border-b border-gray-200"
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
                    {categoryName}
                  </span>
                  <h4 className="text-sm font-semibold text-black">
                    {article.title}
                  </h4>
                  <p className="text-xs text-black">
                    {article.author_name || "Author"} •{" "}
                    {new Date(article.created_at).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
