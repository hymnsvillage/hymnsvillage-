
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { FaComment, FaEye, FaHeart } from "react-icons/fa";
import { IoChevronForwardCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function HeroBannerSlider() {
  const [slides, setSlides] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHeroBlogs() {
      try {
        const res = await fetch('/api/blog/recent');
        const result = await res.json();
        if (result.success && result.data.blogs.length > 0) {
          // Take first 3 blogs for hero slider
          setSlides(result.data.blogs.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch hero blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHeroBlogs();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full h-[500px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Loading hero content...</p>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative w-full h-[500px] bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">No hero content available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[500px]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 7000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => {
          const imageUrl = slide.blog_media?.[0]?.url || "/blog 1.png";
          const description = slide.content.substring(0, 150) + "...";
          const categoryName = slide.blog_categories?.name || "Technology";
          
          return (
            <SwiperSlide key={slide.id}>
              <Link href={`/article/${slide.id}`}>
                <div className="relative w-full h-[500px] cursor-pointer">
                  <Image
                    src={imageUrl}
                    alt={slide.title}
                    fill
                    className="object-cover opacity-70"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent p-8 flex items-center">
                    <div className="max-w-2xl space-y-4 text-white">
                      <span className="bg-purple-600 text-xs px-3 py-1 rounded-full font-medium">
                        {categoryName}
                      </span>
                      <h1 className="text-3xl md:text-4xl font-bold leading-tight hover:underline">
                        {slide.title}
                      </h1>
                      <p className="text-sm text-gray-200">{description}</p>
                      <div className="flex items-center text-sm gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/avatar.png"
                            alt={slide.author_name || "Author"}
                            width={28}
                            height={28}
                            className="rounded-full"
                          />
                          <span className="font-medium">{slide.author_name || "Author"}</span>
                        </div>
                        <span className="text-gray-300">
                          {new Date(slide.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 text-gray-300">
                          <FaComment className="text-sm" /> 24
                        </span>
                        <span className="flex items-center gap-1 text-gray-300">
                          <FaEye className="text-sm" /> 88
                        </span>
                        <span className="flex items-center gap-1 text-gray-300">
                          <FaHeart className="text-sm" /> 67
                        </span>
                      </div>
                    </div>
                    {/* Styled Right Arrow Only */}
                    <button className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:scale-105 transition">
                      <IoChevronForwardCircle className="drop-shadow-xl text-white/90" />
                    </button>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
