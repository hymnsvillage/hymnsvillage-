import SocialIcons from "@/components/SocialLinks";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Fetch hymn by slug from WordPress
async function getHymnBySlug(slug: string) {
  try {
    const res = await fetch(
      `https://cms.hymnsvillage.com/wp-json/wp/v2/hymns?slug=${slug}`,
      { cache: "no-store" } // Prevent hydration mismatch
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data?.[0] || null;
  } catch (err) {
    console.error("Failed WP fetch:", err);
    return null;
  }
}

export default async function HymnDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  // fetch hymn
  const hymn = await getHymnBySlug(slug);
  if (!hymn) return notFound();

  return (
    <div className="relative min-h-screen bg-white">
      
      {/* Hero Section */}
      <div className="relative w-full h-[300px]">
        <Image
          src="/hymnallyrics.jpg"
          alt="Tree background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-semibold text-center leading-tight">
            THE CHURCH <br /> CONGREGATIONAL HYMNS
          </h1>
        </div>
      </div>

      {/* Floating Card */}
      <div className="relative z-10 max-w-6xl mx-auto -mt-28 px-4">
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Lyrics Section */}
          <div>
            <h2 className="text-lg font-bold mb-2">
              {hymn.title?.rendered ?? "Untitled Hymn"}
            </h2>

            <div
              suppressHydrationWarning
              className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: hymn.content?.rendered || "" }}
            />

            <div className="mt-6">
              <Link href="/hymnals" className="text-blue-500 underline text-sm">
                ← Back to Hymns List
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Send us a message</h2>

            <form className="space-y-4">
              <input className="w-full border border-gray-300 px-4 py-2 rounded" placeholder="Full Name" />
              <input className="w-full border border-gray-300 px-4 py-2 rounded" placeholder="Email" />
              <textarea className="w-full border border-gray-300 px-4 py-2 rounded min-h-[100px]" placeholder="Your message here..." />

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                Send
              </button>
            </form>

            <div className="mt-6">
              <p className="text-sm text-gray-700 font-medium mb-2">
                Our socials
              </p>
              <SocialIcons />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
