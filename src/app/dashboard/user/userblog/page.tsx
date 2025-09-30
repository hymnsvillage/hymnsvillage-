'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MoreHorizontal, Pencil, Trash2, Plus } from 'lucide-react';
import NoblogUi from '@/components/dashboard/user_dashboard/NoblogUi';

interface Blog {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  created_at: string;
  image_url: string;
  status: 'published' | 'draft';
}

export default function BlogPage() {
  const router = useRouter();

  const [articles, setArticles] = useState<Blog[]>([]);
  const [view, setView] = useState<'published' | 'draft'>('published');
  const [category, setCategory] = useState('All');
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) {
          console.error('Failed to fetch blogs');
          return;
        }
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredArticles = articles.filter((a) => {
    const matchStatus = a.status === view;
    const matchCategory = category === 'All' || a.category === category;
    return matchStatus && matchCategory;
  });

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    // optional: call API to delete
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const handleEdit = (id: number) => {
    router.push(`/dashboard/blog/edit/${id}`);
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (articles.length === 0) {
    return <NoblogUi />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">My Blog</h1>
          <button
            onClick={() => router.push('/dashboard/user/userblog/createblog')}
            className="bg-black text-white rounded-full p-1 hover:bg-gray-800"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-full">
            <button
              onClick={() => setView('published')}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                view === 'published' ? 'bg-black text-white' : 'text-gray-600'
              }`}
            >
              Blog Posts
            </button>
            <button
              onClick={() => setView('draft')}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                view === 'draft' ? 'bg-black text-white' : 'text-gray-600'
              }`}
            >
              Draft
            </button>
          </div>

          {/* Category Select */}
          <select
            className="border rounded-md text-sm px-3 py-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">Category | All</option>
            <option value="Worship">Worship</option>
            <option value="Faith">Faith</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="flex items-center bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition relative"
          >
            {/* Image */}
            <div className="w-32 h-24 relative rounded-md overflow-hidden">
              <Image
                src={article.image_url || '/no-data.png'}
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
              <h2 className="text-sm font-semibold line-clamp-2">{article.title}</h2>
              <p className="text-xs text-gray-500 line-clamp-1">{article.excerpt}</p>
              <div className="text-xs mt-1 flex items-center gap-4 text-gray-400">
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* More Menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpenId(menuOpenId === article.id ? null : article.id)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>

              {menuOpenId === article.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleEdit(article.id)}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 text-sm text-red-600"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
