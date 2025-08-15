"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Blog = {
  id: string;
  title: string;
  slug?: string;
  blog_categories?: { name: string };
  blog_media?: { url: string }[];
  tags?: string[];
  created_at?: string;
};

export default function InsightsGrid() {
  const [topRow, setTopRow] = useState<Blog[]>([]);
  const [bottomRow, setBottomRow] = useState<Blog[]>([]);
  const [sidebarArticles, setSidebarArticles] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blog?page=1&limit=9");
        const { data } = await res.json();

        const blogs: Blog[] = data.blogs || [];

        // Match screenshot layout:
        // First 2 = top row, Next 3 = bottom row, Rest = sidebar
        setTopRow(blogs.slice(0, 2));
        setBottomRow(blogs.slice(2, 5));
        setSidebarArticles(blogs.slice(5));
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

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

        {/* Sidebar */}
<div className="bg-white border-t border-gray-300 divide-y divide-gray-300">
  {sidebarArticles.map((article) => (
    <Link
      href={`/article/${article.slug || article.id}`}
      key={article.id}
      className="block"
    >
      <div className="flex items-start gap-3 py-4 cursor-pointer hover:opacity-90">
        <Image
          src={article.blog_media?.[0]?.url || "/placeholder.png"}
          alt={article.title}
          width={100}
          height={70}
          className="rounded-md object-cover"
        />
        <div>
          {/* Category */}
          <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded-full inline-block mb-1">
            {article.blog_categories?.name || "Uncategorized"}
          </span>

          {/* Title */}
          <h4 className="text-sm font-semibold text-gray-800 leading-snug">
            {article.title}
          </h4>

          {/* Meta */}
          <div className="text-xs text-gray-500 mt-1">
            Hidden • 5 min read
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>

      </div>
    </section>
  );
}

function BlogCard({ article }: { article: Blog }) {
  return (
    <Link href={`/article/${article.id}`}>
      <div className="rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition bg-white">
        <div className="relative w-full h-48">
          <Image
            src={article.blog_media?.[0]?.url || "/placeholder.png"}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded-full inline-block mb-2">
            {article.blog_categories?.name || "Uncategorized"}
          </span>
          <h3 className="text-sm font-medium text-gray-800">{article.title}</h3>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <Image
              src="/avatar.png"
              alt="Author"
              width={24}
              height={24}
              className="rounded-full mr-2"
            />
            Hidden • {new Date(article.created_at || "").toDateString()} • 5 min read
          </div>
        </div>
      </div>
    </Link>
  );
}
