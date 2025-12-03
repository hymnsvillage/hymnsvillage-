import Image from "next/image";
import Link from "next/link";

export default function FeaturedHymns() {
  const hymns = [
    {
      title: "Ibibio Hymns",
      excerpt:
        "JEHOVAH – UBONG EBE | JEHOVAH – UBONG EBE | Bedford (C.M), C.H. 240, M.B. 153 | Mbono Nyin Oton | Eyohob Enyene Ebit Utton Ye Mbom.",
      image: "/ibibio-hymns.jpg", 
      slug: "ibibio",
    },
    {
      title: "Efik Hymns",
      excerpt:
        "JEHOVAH – UBÓ | EBE | Bedford (C.M), C.H. 242, M.B. 154 | Mbono Nyin | Psalms 146:8 – Akad.",
      image: "/efik-hymns.jpg",
      slug: "efik",
    },
    {
      title: "English Hymns",
      excerpt:
        "THE CHURCH CONGREGATIONAL HYMNS | THE LORD – HIS GLORY | C.H. 247 | The Lord Is Very Gracious | The Lord Is Gracious And Full Of Compassion.",
      image: "/english-hymns.jpg",
      slug: "english",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-semibold">
          Explore Featured Hymns
        </h2>

        <Link
          href="/hymnals"
          className="border border-black px-6 py-2 rounded-full text-sm hover:bg-black hover:text-white transition"
        >
          Discover Our Hymns
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hymns.map((h, index) => (
          <Link
            key={index}
            href={`/hymnals`}
            className="border rounded-2xl overflow-hidden bg-white hover:shadow-md transition"
          >
            <div className="relative w-full h-52">
              <Image
                src={h.image}
                alt={h.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-base font-semibold mb-1">{h.title}</h3>
              <p className="text-sm text-gray-600 leading-snug line-clamp-2">
                {h.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
