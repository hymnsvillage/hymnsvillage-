'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Music, Play, Download } from 'lucide-react';

// Import JSON files
import english from '@/data/englishHymns.json';
import efik from '@/data/efikHymns.json';
import ibibio from '@/data/ibibioHymns.json';
import Link from 'next/link';

type HymnCategory = 'All' | 'Efik' | 'English' | 'Ibibio';

type Hymn = {
  slug: string;
  id: number;
  title: string;
  author: string;
  lyrics: string;
  category: HymnCategory;
  date: string;
  image: string;
  audioUrl: string;
  lyricsUrl: string;
};

// Add extra display props (date, image...) to all imported hymns
const allHymns: Hymn[] = [
  ...english.map((h) => ({
    ...h,
    category: 'English',
    date: '2025-01-03',
    image: '/hymn-image-5.jpg',
    audioUrl: '/sample-audio.mp3',
    lyricsUrl: '/sample-lyrics.pdf',
  })),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...efik.map((h: any) => ({
    ...h,
    category: 'Efik',
    date: '2025-01-03',
    image: '/hymn-image-4.jpg',
    audioUrl: '/sample-audio.mp3',
    lyricsUrl: '/sample-lyrics.pdf',
  })),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...ibibio.map((h: any) => ({
    ...h,
    category: 'Ibibio',
    date: '2025-01-03',
    image: '/hymn-image-6.jpg',
    audioUrl: '/sample-audio.mp3',
    lyricsUrl: '/sample-lyrics.pdf',
  })),
];

export default function RecentHymns() {
    const [selectedCategory, setSelectedCategory] = useState<HymnCategory>('All');
    const [currentAudio, setCurrentAudio] = useState<string | null>(null);

    const filteredHymns =
    selectedCategory === 'All'
      ? allHymns
      : allHymns.filter((hymn) => hymn.category === selectedCategory);

    const handlePlay = (audioUrl: string) => {
    setCurrentAudio(audioUrl);
    };

    const handleDownload = (lyricsUrl: string, title: string) => {
    const a = document.createElement('a');
       a.href = lyricsUrl;
       a.download = `${title}.pdf`;
       a.click();
    };

    const handleMusicInfo = (title: string) => {
       alert(`Showing info for "${title}"`);
     };

    const slugify = (title: string) =>
      title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')  // remove punctuation
      .replace(/\s+/g, '-')         // replace spaces with hyphens
      .trim();


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
              <Image
                src={hymn.image}
                alt={hymn.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-500">{hymn.author}</p>

              <Link href={`/hymnals/${hymn.category.toLowerCase()}/${slugify(hymn.title)}`}>
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
