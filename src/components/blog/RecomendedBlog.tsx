
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";
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

export default function RecommendedSection() {
  const [featuredArticle, setFeaturedArticle] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedArticle() {
      try {
        const res = await fetch('/api/blog/recent');
        const result = await res.json();
        if (result.success && result.data.blogs.length > 0) {
          // Get the first blog as featured
          setFeaturedArticle(result.data.blogs[0]);
        }
      } catch (error) {
        console.error("Failed to fetch featured article:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedArticle();
  }, []);

  if (loading) {
    return (
      <section className="bg-white px-6 md:px-16 py-8">
        <h2 className="text-lg font-semibold mb-4">Recommended</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="bg-gray-200 animate-pulse rounded-xl h-96"></div>
          <div className="bg-gray-200 animate-pulse rounded-xl h-96"></div>
        </div>
      </section>
    );
  }

  if (!featuredArticle) {
    return (
      <section className="bg-white px-6 md:px-16 py-8">
        <h2 className="text-lg font-semibold mb-4">Recommended</h2>
        <p>No featured articles available.</p>
      </section>
    );
  }

  const imageUrl = featuredArticle.blog_media?.[0]?.url || "/Rectangle 1 (1).png";
  const description = featuredArticle.content.substring(0, 150) + "...";
  const categoryName = featuredArticle.blog_categories?.name || "Technology";

  return (
    <section className="bg-white px-6 md:px-16 py-8">
      <h2 className="text-lg font-semibold mb-4">Recommended</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Left - Featured Article */}
        <Link href={`/article/${featuredArticle.id}`}>
          <div className="relative rounded-xl overflow-hidden cursor-pointer group">
            <Image
              src={imageUrl}
              alt={featuredArticle.title}
              width={800}
              height={400}
              className="w-full h-auto object-cover rounded-xl"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 flex flex-col justify-end text-white">
              <div className="flex space-x-2 mb-2">
                <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
                  {categoryName}
                </span>
                <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Featured
                </span>
              </div>
              <h3 className="text-xl font-bold leading-tight group-hover:underline">
                {featuredArticle.title}
              </h3>
              <p className="text-sm mt-1 text-gray-200 line-clamp-2">
                {description}
              </p>
              <div className="flex items-center text-xs mt-3 text-gray-300">
                <Image
                  src="/avatar.png"
                  alt="Author"
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                />
                {featuredArticle.author_name || "Author"} • {new Date(featuredArticle.created_at).toLocaleDateString()} • 5 min read • 👁️ 630
              </div>
            </div>
          </div>
        </Link>

        {/* Right - Social Section */}
        <div className="flex flex-col justify-center items-center  gap-4 pt-2">
          <h2 className="text-bold font-bold text-black">Connect With Us</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="w-20 h-20 bg-[#1877F2] text-white rounded-md flex items-center justify-center">
              <FaFacebookF size={25} />
            </button>
            <button className="w-20 h-20 bg-black text-white rounded-md flex items-center justify-center">
              <FaXTwitter size={25} />
            </button>
            <button className="w-20 h-20 bg-[#0A66C2] text-white rounded-md flex items-center justify-center">
              <FaLinkedinIn size={25} />
            </button>
            <button className="w-20 h-20 bg-[#FF0000] text-white rounded-md flex items-center justify-center">
              <FaInstagram size={25} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


      