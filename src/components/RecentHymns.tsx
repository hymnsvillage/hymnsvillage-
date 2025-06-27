'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Music, Play, Download } from 'lucide-react';

type HymnCategory = 'All' | 'Efik' | 'English' | 'Ibibio';

type Hymn = {
  title: string;
  author: string;
  date: string;
  image: string;
  category: HymnCategory;
  audioUrl: string;
  lyricsUrl: string;
};

const hymns: Hymn[] = [
  {
    title: 'The Life - Giving Spirit',
    author: 'Dennis Cooper',
    date: 'January 3, 2025',
    image: '/hymn-image-4.jpg',
    category: 'Efik',
    audioUrl: '/sample-audio.mp3',
    lyricsUrl: '/sample-lyrics.pdf',
  },
  {
    title: 'Neque Porro Quisquam Est, Qui Dolorem Ipsum',
    author: 'Emilyn Sutherland',
    date: 'January 3, 2025',
    image: '/hymn-image-5.jpg',
    category: 'English',
    audioUrl: '/sample-audio.mp3',
    lyricsUrl: '/sample-lyrics.pdf',
  },
  {
    title: 'Quis Autem Vel Eum Iur',
    author: 'Leonel Edwards',
    date: 'January 3, 2025',
    image: '/hymn-image-6.jpg',
    category: 'Ibibio',
    audioUrl: '/sample-audio.mp3',
    lyricsUrl: '/sample-lyrics.pdf',
  },
  // Add more hymns as needed
];

export default function RecentHymns() {
  const [selectedCategory, setSelectedCategory] = useState<HymnCategory>('All');
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  const filteredHymns =
    selectedCategory === 'All'
      ? hymns
      : hymns.filter((hymn) => hymn.category === selectedCategory);

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
        {filteredHymns.map((hymn, index) => (
          <div
            key={index}
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
              <h3 className="text-lg font-semibold text-slate-700 leading-tight mt-1 mb-2 truncate">
                {hymn.title}
              </h3>
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
