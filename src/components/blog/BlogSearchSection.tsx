'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  featuredImage?: string;
  categories?: { id: number; name: string }[];
  author_name?: string;
  created_at: string;
}

export default function BlogSearchSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          'https://cms.hymnsvillage.com/wp-json/wp/v2/posts?_embed&per_page=9'
        );
        const data = await res.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted = data.map((post: any) => ({
          id: post.id,
          title: post.title.rendered,
          slug: post.slug,
          featuredImage:
            post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
            '/Rectangle 1 (1).png',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          categories: post._embedded?.['wp:term']?.[0]?.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
          })),
          author_name: post._embedded?.author?.[0]?.name || 'Author',
          created_at: post.date,
        }));

        setBlogs(formatted);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500 animate-pulse">
        Loading articles...
      </p>
    );
  }

  if (!blogs.length) {
    return null;
  }

  return (
    <section className="py-12 bg-white px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((post) => {
          const imageUrl = post.featuredImage || '/Rectangle 1 (1).png';
          const categoryName = post.categories?.[0]?.name || 'General';
          // Calculate approximate read time (assuming 200 words/min)
          const plainText = post.title.replace(/<[^>]+>/g, '');
          const readTime = `${Math.max(1, Math.ceil(plainText.split(' ').length / 200))} min`;

          return (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                <div className="relative w-full h-48">
                  <Image src={imageUrl} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full inline-block">
                    {categoryName}
                  </span>
                  <h3 className="text-base font-semibold group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {post.author_name} • {readTime} read
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
