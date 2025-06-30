// src/app/hymns/english/page.tsx
'use client';

import Link from 'next/link';
import hymns from '@/data/englishHymns.json';

export default function EnglishHymnsPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">English Hymns</h1>
      <ul className="space-y-8">
        {hymns.map((hymn) => (
          <li key={hymn.id} className="bg-white p-6 shadow rounded-md">
            <Link href={`/hymnnals/english/${hymn.slug}`}>
              <h2 className="text-xl font-semibold mb-2 text-blue-600 hover:underline">
                {hymn.title}
              </h2>
            </Link>
            <p className="text-gray-600 italic">{hymn.author}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
