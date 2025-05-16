// components/InsightsGrid.tsx
import Image from "next/image";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  category: string;
  tagColor: string;
  image: string;
  slug: string;
};

const mainArticles: Article[] = [
  {
    id: 1,
    title: "Embark On A Gastronomic Journey With These Mouthwatering Recipes",
    category: "Lifestyle",
    tagColor: "bg-yellow-400",
    image: "/Group 15.png",
    slug: "gastronomic-journey",
  },
  {
    id: 2,
    title: "Explore The Depths Of Innovation In Tech",
    category: "Technology",
    tagColor: "bg-gray-600",
    image: "/Frame 102.png",
    slug: "innovation-tech",
  },
  {
    id: 3,
    title: "Discover Nature’s Mysteries With These Incredible Insights",
    category: "Mysteries",
    tagColor: "bg-green-500",
    image: "/ Group 13.png",
    slug: "nature-mysteries",
  },
  {
    id: 4,
    title: "Bright Ideas To Change The World",
    category: "Ideas",
    tagColor: "bg-red-500",
    image: "/Group 12.png",
    slug: "bright-ideas",
  },
  {
    id: 5,
    title: "Taste The Future Of Food Science",
    category: "Food",
    tagColor: "bg-green-400",
    image: "/Group 14.png",
    slug: "future-food",
  },
];

const sidebarArticles: Article[] = [
  {
    id: 6,
    title: "Organize Your Workspace For Maximum Productivity",
    category: "Productivity",
    tagColor: "bg-blue-500",
    image: "/Rectangle 2.png",
    slug: "workspace-organization",
  },
  {
    id: 7,
    title: "Capture The Skies: Drone Photography Tips",
    category: "Photography",
    tagColor: "bg-indigo-500",
    image: "/Rectangle 13.png",
    slug: "drone-photography",
  },
  {
    id: 8,
    title: "Explore Automotive Innovation Trends",
    category: "Automotive",
    tagColor: "bg-gray-800",
    image: "/Rectangle 9.png",
    slug: "auto-trends",
  },
  {
    id: 9,
    title: "Gastronomy & Culture: A Chef’s Perspective",
    category: "Culture",
    tagColor: "bg-red-600",
    image: "/Rectangle 17.png",
    slug: "chef-culture",
  },
];

export default function InsightsGrid() {
  return (
    <section className="bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">Discover New Insights.</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {/* Main Articles */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainArticles.map((article) => (
            <Link href={`/article/${article.slug}`} key={article.id}>
              <div className="rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition bg-white">
                <div className="relative w-full h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <span
                    className={`text-xs ${article.tagColor} text-white px-2 py-1 rounded-full inline-block mb-2`}
                  >
                    {article.category}
                  </span>
                  <h3 className="text-sm font-medium text-gray-800">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Image
                      src="/avatar.png"
                      alt="Author"
                      width={24}
                      height={24}
                      className="rounded-full mr-2"
                    />
                    Hidden &bull; May 13, 2025 &bull; 5 min read
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sidebar */}
        <div className="bg-white divide-y divide-gray-400">
          {sidebarArticles.map((article) => (
            <Link href={`/article/${article.slug}`} key={article.id}>
              <div className="flex items-start gap-3 py-4 cursor-pointer hover:opacity-90">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={100}
                  height={70}
                  className="rounded-md object-cover"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 leading-snug">
                    {article.title}
                  </h4>
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
