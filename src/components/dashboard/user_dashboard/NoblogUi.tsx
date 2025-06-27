"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [selectedTime, setSelectedTime] = useState("Today");
 const [selectedCategory, setSelectedCategory] = useState("Category | Worship");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetching from backend
    const fetchCategories = async () => {
      // Replace this with your actual API endpoint, e.g., "/api/categories"
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data); // expected format: ["Worship", "Faith", "Healing"]
    };

    fetchCategories();
  }, []);


 return (
    <div className="p-6 space-y-6 bg-[#f5f6f8] border-t-3 min-h-screen">
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
               className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black">
                {categories.map((cat) => (
                <option key={cat} value={`Category | ${cat}`}>
                  {`Category | ${cat}`}
                </option>
               ))}
          </select>
          </div>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex items-center justify-center text-center bg-white gap-4">
        <div className="flex flex-col p-6">
           <h2 className="mt-6 text-5xl font-semibold text-gray-800">
              Oops you currently do not have any blog
           </h2>

            <p className="mt-5 text-sm text-gray-600 max-w-sm">
              Yo Reddit!! What’s a small thing that anyone can do at nearly anytime to improve their ...
           </p>

           <Link
               href="/dashboard/user/userblog/createblog"
                className="mt-10 inline-block px-5 py-2.5 bg-black text-white text-lg rounded-md hover:bg-gray-900 transition"
                    >
                Create Blog post →
          </Link>
        </div>
        <Image
          src="/no-data.png"
          alt="No blog"
          width={380}
          height={260}
        />

      </div>
    </div>
  );
}
