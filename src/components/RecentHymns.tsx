'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Music, Play, Download } from 'lucide-react';
import Link from 'next/link';

type HymnCategory = 'All' | 'Efik' | 'English' | 'Ibibio';

interface Hymn {
  id: number;
  slug: string;
  title: string;
  author: string;
  lyrics: string;
  category: HymnCategory;
  date: string;
  image: string;
  audioUrl: string;
  lyricsUrl: string;
}

export default function RecentHymns() {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<HymnCategory>('All');
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch hymns from WordPress
  useEffect(() => {
    async function fetchHymns() {
      try {
        const res = await fetch(
          'https://cms.hymnsvillage.com/wp-json/wp/v2/hymns?_embed&per_page=100'
        );
        if (!res.ok) throw new Error('Failed to fetch hymns');

        const data = await res.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted: Hymn[] = data.map((h: any) => {
          // Determine category from ACF field
          const rawCategory = h.acf?.category?.toLowerCase() || 'english';

          const category: HymnCategory =
            rawCategory === 'efik'
              ? 'Efik'
              : rawCategory === 'ibibio'
              ? 'Ibibio'
              : 'English';

          return {
            id: h.id,
            slug: h.slug, // <-- IMPORTANT: REAL WORDPRESS SLUG
            title: h.title.rendered,
            author: h.acf?.author || 'Unknown',
            lyrics: h.acf?.lyrics || '',
            category,
            date: new Date(h.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
            image: h._embedded['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg',
            audioUrl: h.acf?.audio || '/sample-audio.mp3',
            lyricsUrl: h.acf?.lyrics_file || '/sample-lyrics.pdf',
          };
        });

        setHymns(formatted);
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

  const filteredHymns =
    selectedCategory === 'All'
      ? hymns
      : hymns.filter((hymn) => hymn.category === selectedCategory);

  const handlePlay = (audioUrl: string) => setCurrentAudio(audioUrl);

  const handleDownload = (lyricsUrl: string, title: string) => {
    const a = document.createElement('a');
    a.href = lyricsUrl;
    a.download = `${title}.pdf`;
    a.click();
  };

  const handleMusicInfo = (title: string) => alert(`Showing info for "${title}"`);

  if (loading)
    return <p className="text-center mt-20 text-slate-700">Loading hymns...</p>;

  if (error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="bg-white p-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between">
        <h2 className="text-slate-900 text-3xl font-semibold mb-6">Recent Hymns</h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {(['All', 'Efik', 'English', 'Ibibio'] as HymnCategory[]).map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat} Hymns
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHymns.map((hymn) => (
          <div
            key={hymn.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl"
          >
            <div className="relative w-full h-48">
              <Image src={hymn.image} alt={hymn.title} fill className="object-cover" />
            </div>

            <div className="p-4">
              <p className="text-sm text-slate-500">{hymn.author}</p>

              {/* FIXED URL — using REAL WP slug */}
              <Link href={`/hymnals/${hymn.slug}`}>
                <h3 className="text-lg font-semibold text-slate-700 hover:underline mt-1 mb-2 truncate">
                  {hymn.title}
                </h3>
              </Link>

              <p className="text-sm text-red-500">{hymn.date}</p>

              <div className="flex space-x-2 mt-4">
                <Button
                  size="icon"
                  className="rounded-full bg-red-500 text-white"
                  onClick={() => handleDownload(hymn.lyricsUrl, hymn.title)}
                >
                  <Download size={16} />
                </Button>

                <Button
                  size="icon"
                  className="rounded-full bg-red-500 text-white"
                  onClick={() => handleMusicInfo(hymn.title)}
                >
                  <Music size={16} />
                </Button>

                <Button
                  size="icon"
                  className="rounded-full bg-red-500 text-white"
                  onClick={() => handlePlay(hymn.audioUrl)}
                >
                  <Play size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentAudio && (
        <div className="mt-6">
          <h4 className="text-slate-700 font-medium mb-2">Now Playing</h4>
          <audio controls autoPlay className="w-full">
            <source src={currentAudio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}
