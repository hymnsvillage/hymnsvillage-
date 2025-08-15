'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  category: string;
  author: string;
  created_at: string;
  read_time: string;
}

export default function BlogSearchSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setBlogs(data?.data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading articles...</p>;
  }

  if (!blogs.length) {
    return null; // Simply return nothing if there are no blogs
  }

  return (
    <section className="py-12 bg-white px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <div className="relative w-full h-48">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full inline-block">
                  {post.category}
                </span>
                <h3 className="text-base font-semibold group-hover:underline">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {post.author} • {post.read_time} read
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
