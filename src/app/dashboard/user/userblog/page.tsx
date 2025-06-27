// app/dashboard/blog/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import NoblogUi from '@/components/dashboard/user_dashboard/NoblogUi';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';

export default function BlogPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [articles, setArticles] = useState<any[]>([]); // this starts empty
  const [filter, setFilter] = useState('Today');
  const [category, setCategory] = useState('Worship');

  // Simulate articles being fetched (or added later)
  useEffect(() => {
    // simulate delay like Supabase loading
    setTimeout(() => {
      const dummyData = [
        {
          id: 1,
          category: 'Lifestyle',
          title: "What's A Small Thing Anyone Can Do...",
          excerpt: "A quick way to improve your life by 1% daily...",
          author: 'Admin',
          timestamp: '3hrs ago',
          image: '/images/article1.jpg',
        },
        {
          id: 2,
          category: 'Faith',
          title: 'How to Build Unshakable Trust in God',
          excerpt: 'Trust is built through trials and encounters...',
          author: 'You',
          timestamp: 'Yesterday',
          image: '/images/article2.jpg',
        },
      ];

      setArticles(dummyData); // ← this simulates articles being added
    }, 5000); // change to 0 if you want it immediate
  }, []);

  if (articles.length === 0) {
    return <NoblogUi />;
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Blog</h1>
        <div className="flex gap-4 items-center">
          {/* Filter Buttons */}
          <div className="flex border rounded-full bg-gray-100">
            <button
              onClick={() => setFilter('Today')}
              className={`px-4 py-1 rounded-full ${filter === 'Today' ? 'bg-black text-white' : ''}`}
            >
              Today
            </button>
            <button
              onClick={() => setFilter('Last Week')}
              className={`px-4 py-1 rounded-full ${filter === 'Last Week' ? 'bg-black text-white' : ''}`}
            >
              Last Week
            </button>
          </div>

          {/* Category Select */}
          <select
            className="border p-2 rounded-md text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Worship">Worship</option>
            <option value="Faith">Faith</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>
      </div>

      {/* Blog Articles */}
      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex items-center bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition"
          >
            {/* Image */}
            <div className="w-32 h-24 relative rounded-md overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                {article.category}
              </span>
            </div>

            {/* Text Info */}
            <div className="flex-1 px-4">
              <h2 className="text-sm font-semibold truncate">{article.title}</h2>
              <p className="text-xs text-gray-500 truncate">{article.excerpt}</p>
              <div className="text-xs mt-1 flex items-center gap-4 text-gray-400">
                <span>{article.author}</span>
                <span>{article.timestamp}</span>
              </div>
            </div>

            {/* Menu Icon */}
            <button className="p-2">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
