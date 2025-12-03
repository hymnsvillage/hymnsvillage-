'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getHymnsByLanguage } from '@/lib/hymns';

interface Hymn {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: { author?: string };
}

export default function EnglishHymnsPage() {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHymns() {
      try {
        const data = await getHymnsByLanguage('english');
        setHymns(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchHymns();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-700">
        Loading English hymns...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-20 text-red-500">{error}</p>
    );

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">English Hymns</h1>
      <ul className="space-y-8">
        {hymns.map((hymn) => (
          <li key={hymn.id} className="bg-white p-6 shadow rounded-md">
            <Link href={`/hymnals/${hymn.slug}`}>
              <h2 className="text-xl font-semibold mb-2 text-blue-600 hover:underline">
                {hymn.title.rendered}
              </h2>
            </Link>
            <p className="text-gray-600 italic">
              {hymn.acf?.author || 'Unknown'}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
