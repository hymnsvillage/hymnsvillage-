'use client'

import { useEffect, useState } from 'react';

export function useBlogs({ page = 1, limit = 6 } = {}) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`/api/blog?page=${page}&limit=${limit}`);
        const result = await res.json();
        setBlogs(result?.data?.blogs || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [page, limit]);

  return { blogs, loading };
}
