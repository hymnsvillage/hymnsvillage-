"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Hymn {
  id: string;
  title: string;
  lyrics: string;
  language: string;
  hymn_media?: { id: string; url: string; type: string }[];
}

export default function FeaturedHymns() {
  const [featured, setFeatured] = useState<Hymn[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        // grab 3 hymns (one from each language, or just the latest 3)
        const res = await fetch("/api/hymns?page=1&limit=3");
        const json = await res.json();
        setFeatured(json.data.hymns || []);
      } catch (err) {
        console.error("Error fetching featured hymns:", err);
      }
    }
    fetchFeatured();
  }, []);

  const slugify = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .trim();

  return (
    <section className="py-12 px-6 md:px-12 bg-white">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h2 className="text-black text-xl md:text-2xl font-semibold">
          Explore Featured Hymns
        </h2>
        <Link href="/hymnals">
          <button className="border border-black rounded-full px-5 py-2 text-black text-sm hover:bg-black hover:text-white transition-colors duration-300">
            Discover Our Hymns
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((hymn) => {
          const image =
            hymn.hymn_media?.find((m) => m.type === "image")?.url ||
            "/default-hymn.jpg";

          return (
            <Link
              key={hymn.id}
              href={`/hymnals/${hymn.language.toLowerCase()}/${slugify(
                hymn.title
              )}`}
              className="group"
            >
              <div className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="relative w-full h-60">
                  <Image
                    src={image}
                    alt={hymn.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-black text-lg font-semibold mb-2">
                    {hymn.title}
                  </h3>
                  <p className="text-sm text-gray-700 line-clamp-4">
                    {hymn.lyrics.substring(0, 150)}...
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
