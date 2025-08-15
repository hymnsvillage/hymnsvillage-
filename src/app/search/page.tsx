// app/search/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Article = {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: {
    name: string;
  };
};

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blog/search?q=${encodeURIComponent(query)}`);
        const json = await res.json();
        setResults(json.data?.results || []);
      } catch (err) {
        console.error("Error fetching search results", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for: <span className="text-black italic">&quot;{query}&quot;</span>
      </h1>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-600">No articles found.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {results.map((article) => (
          <Link href={`/article/${article.slug}`} key={article.id}>
            <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition bg-white">
              <div className="relative w-full h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full inline-block mb-2">
                  {article.category?.name || "Uncategorized"}
                </span>
                <h3 className="text-sm font-medium text-gray-800">
                  {article.title}
                </h3>
                <div className="text-xs text-gray-500 mt-2">
                  Hidden • 5 min read
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
