"use client";

import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "Embark On A Gastronomic Journey With These Mouthwatering Recipes",
    category: "Lifestyle",
    author: "Hudeen",
    date: "5hrs ago",
    slug: "gastronomic-journey-recipes",
    image: "/Rectangle 1 (2).png",
  },
  {
    id: 2,
    title: "Embark On A Gastronomic Journey With These Mouthwatering Recipes",
    category: "Nature",
    author: "Hudeen",
    date: "5hrs ago",
    slug: "journey-through-nature",
    image: "/Rectangle 2 (2).png",
  },
  {
    id: 3,
    title: "Embark On A Gastronomic Journey With These Mouthwatering Recipes",
    category: "Technology",
    author: "Hudeen",
    date: "5hrs ago",
    slug: "tech-mindset-recipes",
    image: "/Rectangle 3.png",
  },
  {
    id: 4,
    title: "Embark On A Gastronomic Journey With These Mouthwatering Recipes",
    category: "Nature",
    author: "Hudeen",
    date: "5hrs ago",
    slug: "rocky-trails-recipes",
    image: "/Rectangle 4.png",
  },
  {
    id: 5,
    title: "Embark On A Gastronomic Journey With These Mouthwatering Recipes",
    category: "Lifestyle",
    author: "Hudeen",
    date: "5hrs ago",
    slug: "sunset-friends-recipes",
    image: "/Rectangle 6.png",
  },
  {
    id: 6,
    title: "Embark On A Gastronomic Journey With These Mouthwatering Recipes",
    category: "Travel",
    author: "Hudeen",
    date: "5hrs ago",
    slug: "dancing-sunset-recipes",
    image: "/Rectangle 5.png",
  },
];

export default function RecentPosts() {
  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent posts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
              <div className="rounded-md overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-3 space-y-1">
                <span className="inline-block text-xs font-medium text-white bg-green-600 px-2 py-1 rounded">
                  {post.category}
                </span>
                <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {post.author} · {post.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
