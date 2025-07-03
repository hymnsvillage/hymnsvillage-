'use client';

import { notFound } from 'next/navigation';
import english from '@/data/englishHymns.json';
import efik from '@/data/efikHymns.json';
import ibibio from '@/data/ibibioHymns.json';
import Image from 'next/image';
import SocialIcons from '@/components/SocialLinks'; // ← Update path as needed

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .trim();

type Category = 'english' | 'efik' | 'ibibio';

const allHymns: Record<Category, typeof english> = {
  english,
  efik,
  ibibio,
};

export default function HymnDetailPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const rawCategory = params.category.toLowerCase();
  if (!['english', 'efik', 'ibibio'].includes(rawCategory)) return notFound();
  const category = rawCategory as Category;

  const hymns = allHymns[category];
  const hymn = hymns.find((h) => slugify(h.title) === params.slug);
  if (!hymn) return notFound();

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero section */}
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

      {/* Floating white card overlapping the hero image */}
      <div className="relative z-10 max-w-6xl mx-auto -mt-28 px-4">
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Lyrics Section */}
          <div className="overflow-y-auto max-h-[600px]">
            <h2 className="text-lg font-bold mb-1">{hymn.title}</h2>
            <p className="text-sm text-gray-500 mb-4">by {hymn.author}</p>
            <pre className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed">
              {hymn.lyrics}
            </pre>
            <div className="mt-6">
              <a
                href={`/hymnals/${category}`}
                className="text-blue-500 underline text-sm"
              >
                ← Back to {category} hymns
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 px-4 py-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 px-4 py-2 rounded"
              />
              <textarea
                placeholder="Your message here..."
                className="w-full border border-gray-300 px-4 py-2 rounded min-h-[100px]"
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                Send
              </button>
            </form>

            {/* Social Icons */}
            <div className="mt-6">
              <p className="text-sm text-gray-700 font-medium mb-2">Our socials</p>
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
