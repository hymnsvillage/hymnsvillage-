import { notFound } from 'next/navigation';
import english from '@/data/englishHymns.json';
import efik from '@/data/efikHymns.json';
import ibibio from '@/data/ibibioHymns.json';

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
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{hymn.title}</h1>
      <p className="text-gray-600 mb-6">by {hymn.author}</p>
      <pre className="whitespace-pre-wrap text-gray-800">{hymn.lyrics}</pre>
      <div className="mt-8">
        <a href={`/hymnals/${category}`} className="text-blue-500 underline">
          ← Back to {category} hymns
        </a>
      </div>
    </section>
  );
}
