'use client';

import Image from 'next/image';

export interface Article {
  title: string;
  category: string;
  author: string;
  time: string;
  image: string;
}

interface InsightsSectionProps {
  featured: Article[];
  recent: Article[];
}

export default function InsightsSection({ featured, recent }: InsightsSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 bg-white">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-semibold text-black">Discover New Insights.</h1>
        <div className="flex flex-1 justify-center md:justify-start max-w-md">
          <div className="flex w-full rounded-full overflow-hidden border border-gray-300">
            <input
              type="text"
              placeholder="Search articles"
              className="flex-1 px-4 py-2 outline-none"
            />
            <button className="bg-black text-white px-4 py-2">Search</button>
          </div>
        </div>
        <h2 className="text-xl font-medium text-black">Recent article</h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Featured */}
        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((article, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden">
              <div className="relative w-full h-40">
                <Image
                  src={article.image}
                  alt="Article"
                  fill
                  className="object-cover"
                />
                <span className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full text-white ${getBadgeColor(article.category)}`}>
                  {article.category}
                </span>
              </div>
              <div className="p-3 space-y-1">
                <h3 className="text-sm font-semibold text-black leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-black">
                  {article.author} • {article.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Recent Articles Sidebar */}
        <div className="space-y-4">
          {recent.map((article, index) => (
            <div key={index} className="flex items-start gap-5 pb-4 border-b border-gray-200">
              <div className="w-16 h-16 relative rounded-md overflow-hidden bg-gray-100">
                <Image
                  src={article.image}
                  alt="Recent"
                 fill
                  className="object-cover w-"
                />
              </div>
              <div className="flex-1">
                <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full inline-block mb-1">
                  {article.category}
                </span>
                <h4 className="text-sm font-semibold text-black">
                  {article.title}
                </h4>
                <p className="text-xs text-black">
                  {article.author} • {article.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getBadgeColor(category: string) {
  switch (category.toLowerCase()) {
    case 'lifestyle':
      return 'bg-red-500';
    case 'technology':
      return 'bg-gray-800';
    case 'mysticism':
      return 'bg-yellow-500';
    case 'travel':
      return 'bg-green-500';
    default:
      return 'bg-blue-500';
  }
}
