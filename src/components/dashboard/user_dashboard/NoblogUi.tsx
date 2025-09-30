"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  // add more fields like image if you need
}

export default function BlogPage() {
  const [selectedTime, setSelectedTime] = useState("Today");
  const [selectedCategory, setSelectedCategory] = useState("Category | Worship");
  const [categories, setCategories] = useState<string[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch categories
        const catRes = await fetch("/api/categories");
        const catData = await catRes.json();
        setCategories(catData);

        // ✅ Fetch blogs for the logged-in user
        const blogRes = await fetch("/api/blog"); // adjust to your endpoint
        const blogData = await blogRes.json();
        setBlogs(blogData);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#f5f6f8] border-t-3 min-h-screen">
      {/* Header with filters */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-semibold whitespace-nowrap">My Blog</h1>

        <div className="flex flex-1 justify-center">
          <div className="flex justify-center w-full">
            <div className="flex bg-gray-100 rounded-full overflow-hidden">
              <button
                onClick={() => setSelectedTime("Today")}
                className={`px-4 py-2 text-sm font-medium transition ${
                  selectedTime === "Today" ? "bg-black text-white" : "text-gray-600"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setSelectedTime("Last Week")}
                className={`px-4 py-2 text-sm font-medium transition ${
                  selectedTime === "Last Week" ? "bg-black text-white" : "text-gray-600"
                }`}
              >
                Last Week
              </button>
            </div>
          </div>

          <div className="ml-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              {categories.map((cat) => (
                <option key={cat} value={`Category | ${cat}`}>
                  {`Category | ${cat}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ✅ Conditional Rendering */}
      {blogs.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex items-center justify-center text-center bg-white gap-4">
          <div className="flex flex-col p-6">
            <h2 className="mt-6 text-5xl font-semibold text-gray-800">
              Oops you currently do not have any blog
            </h2>

            <p className="mt-5 text-sm text-gray-600 max-w-sm">
              Start writing your first blog and share your thoughts with the world!
            </p>

            <Link
              href="/dashboard/user/userblog/createblog"
              className="mt-10 inline-block px-5 py-2.5 bg-black text-white text-lg rounded-md hover:bg-gray-900 transition"
            >
              Create Blog post →
            </Link>
          </div>
          <Image src="/no-data.png" alt="No blog" width={380} height={260} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{blog.content}</p>
              <span className="text-xs text-gray-400 mt-2 block">
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
