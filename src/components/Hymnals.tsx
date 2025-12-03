import Image from "next/image";
import { useEffect, useState } from "react";

interface Hymn {
  src: string;
  author: string;
  title: string;
  date: string;
  slug: string;
  category: string; // wp category slug
  audio?: string | null;
  youtube?: string | null;
}

export default function HymnalPage() {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch category name by ID
  async function fetchCategorySlug(id: number): Promise<string | null> {
    const res = await fetch(
      `https://cms.hymnsvillage.com/wp-json/wp/v2/categories/${id}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.slug || null;
  }

  useEffect(() => {
    async function fetchHymns() {
      try {
        const res = await fetch(
          "https://cms.hymnsvillage.com/wp-json/wp/v2/hymns?_embed"
        );
        if (!res.ok) throw new Error("Failed to fetch hymns");

        const data = await res.json();

        const formatted: Hymn[] = [];

        for (const hymn of data) {
          const categoryId = hymn.categories?.[0];

          let categorySlug = "english"; // fallback

          if (categoryId) {
            const realSlug = await fetchCategorySlug(categoryId);
            if (realSlug) categorySlug = realSlug;
          }

          formatted.push({
            src:
              hymn._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/placeholder.jpg",
            author: hymn.acf?.author || "Unknown",
            title: hymn.title.rendered,
            slug: hymn.slug,
            category: categorySlug,
            date: new Date(hymn.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            audio: hymn.acf?.audio || null,
            youtube: hymn.acf?.youtube_link || null,
          });
        }

        setHymns(formatted);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchHymns();
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-white">Loading hymns...</p>;
  if (error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <section className="relative overflow-hidden">
      <main className="relative bg-black min-h-screen text-white">
        <Image
          src="/hymnal.jpg"
          alt="Hymnal Background"
          fill
          quality={100}
          className="absolute object-cover z-0"
        />

        <div className="relative z-10 px-8 py-12 grid grid-cols-1">
          <div className="mt-10 flex flex-col justify-center gap-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              Discover Sacred Songs: Explore Our Collection of Hymns
            </h1>
            <p className="text-[14px] md:text-lg mb-10 text-center">
              Explore a curated digital sanctuary of English and Efik hymns,
              alongside insightful articles that resonate with the heart of
              faith. Join a vibrant community where shared devotion finds
              harmonious expression.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              New Listing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hymns.map((item, idx) => (
                <a
                  href={`/hymnals/${item.category}/${item.slug}`}
                  key={idx}
                  className="relative group overflow-hidden rounded-xl shadow-lg"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={400}
                    height={400}
                    quality={100}
                    className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    {item.youtube ? (
                      <a
                        href={item.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 flex items-center justify-center"
                      >
                        <button className="w-16 h-16 bg-red-600 text-white rounded-full text-2xl flex items-center justify-center shadow-lg cursor-pointer">
                          ▶
                        </button>
                      </a>
                    ) : item.audio ? (
                      <audio
                        controls
                        className="w-16 h-16 rounded-full bg-white text-black"
                      >
                        <source src={item.audio} type="audio/mpeg" />
                      </audio>
                    ) : (
                      <button
                        aria-label={`Play hymn: ${item.title}`}
                        className="w-16 h-16 bg-white text-black rounded-full text-2xl flex items-center justify-center shadow-lg cursor-pointer"
                      >
                        ▶
                      </button>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

                  <p className="absolute bottom-12 left-2 text-sm text-white z-10">
                    {item.author}
                  </p>

                  <h3 className="absolute bottom-4 left-2 text-lg font-semibold leading-tight z-10">
                    {item.title}
                  </h3>

                  <p className="absolute bottom-2 left-2 text-sm text-white z-10">
                    {item.date}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
