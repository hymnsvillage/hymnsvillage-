"use client";

import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function InsightsSection() {
  const [query, setQuery] = useState("");
  const [featured, setFeatured] = useState<Blog[]>([]);
  const [recent, setRecent] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchInsights() {
      try {
        const res = await fetch("/api/blog/recent");
        const result = await res.json();

        if (result.success && result.data.blogs.length > 0) {
          // first 3 = featured, next 3 = recent
          setFeatured(result.data.blogs.slice(0, 3));
          setRecent(result.data.blogs.slice(3, 6));
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInsights();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-8 py-12 bg-white">
        <p className="text-center text-gray-500">Loading articles...</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-12 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-semibold text-black">Discover New Insights.</h1>
        <div className="flex flex-1 justify-center md:justify-start max-w-md">
          <form
            onSubmit={handleSubmit}
            className="flex w-full rounded-full overflow-hidden border border-gray-300"
          >
            <div className="flex items-center pl-3">
              <FaSearch className="h-5 w-5 text-gray-300" />
            </div>
            <input
              type="text"
              placeholder="Search articles"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2 outline-none placeholder:text-gray-300 text-gray-800"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 text-sm font-medium rounded-full cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Recent article */}
      <div className="mb-6">
        <h2 className="text-xl font-medium text-black">Recent article</h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Featured */}
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((article) => {
            const imageUrl = article.blog_media?.[0]?.url || "/Rectangle 1 (1).png";
            return (
              <Link
                key={article.id}
                href={`/blog/${article.id}`}
                className="bg-white rounded-lg overflow-hidden block"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <span
                    className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full text-white ${getBadgeColor(
                      article.blog_categories?.name || "general"
                    )}`}
                  >
                    {article.blog_categories?.name || "General"}
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <h3 className="text-sm font-semibold text-black leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-black">
                    {article.author_name || "Author"} •{" "}
                    {new Date(article.created_at).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right: Recent Articles Sidebar */}
        <div className="space-y-4">
          {recent.map((article) => {
            const imageUrl = article.blog_media?.[0]?.url || "/Rectangle 1 (1).png";
            return (
              <Link
                key={article.id}
                href={`/blog/${article.id}`}
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
                    {article.blog_categories?.name || "General"}
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

function getBadgeColor(category: string) {
  switch (category.toLowerCase()) {
    case "lifestyle":
      return "bg-red-500";
    case "technology":
      return "bg-gray-800";
    case "mysticism":
      return "bg-yellow-500";
    case "travel":
      return "bg-green-500";
    default:
      return "bg-blue-500";
  }
}
