"use client";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

const articles = [
  {
    id: 1,
    author: "Jenny Wilson",
    title: "The More Important the Work, the More Important the Rest …",
    avatar: "/avatar-1.jpg",
  },
  {
    id: 2,
    author: "Wade Warren",
    title:
      "Yo Reddit! What's a small thing that anyone can do at nearly anytime to improve their mood and make",
    avatar: "/avatar-2.jpg",
  },
  {
    id: 3,
    author: "Eleanor Pena",
    title:
      "Understanding color theory: the color wheel and finding complementary colors",
    avatar: "/avatar-3.jpg",
  },
  {
    id: 4,
    author: "Annette Black",
    title: "Any mechanical keyboard enthusiasts in design?",
    avatar: "/avatar-4.jpg",
  },
  {
    id: 5,
    author: "Ralph Edwards",
    title: "The More Important the Work, the More Important the Rest",
    avatar: "/avatar.jpg",
  },
];

export default function ManageArticlesPage() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  return (
    <div className="bg-gray-100 min-h-screen p-2 sm:p-6 md:p-8">
      {/* Header */}
      <div className=" px-4 py-3  mb-2 ">
        <h2 className="text-xl font-semibold text-gray-900">Manage Article</h2>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-xl shadow-sm divide-y">
        {articles.map((article) => (
          <div
            key={article.id}
            className="relative flex items-center justify-between px-4 py-6 sm:py-5"
          >
            {/* Avatar + Info */}
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-black overflow-hidden">
                <Image
                  src={article.avatar}
                  alt={article.author}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-sm max-w-[14rem] sm:max-w-none">
                <p className="font-medium text-gray-900">{article.author}</p>
                <p className="text-gray-500 truncate">{article.title}</p>
              </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex space-x-2">
              <button className="text-gray-600 border border-gray-300 px-4 py-1.5 text-sm rounded-full hover:bg-gray-100">
                ✕ Cancel
              </button>
              <button className="bg-gray-900 text-white px-4 py-1.5 text-sm rounded-full hover:bg-gray-800">
                ✓ Approve
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden relative">
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === article.id ? null : article.id)
                }
                className="p-2"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>

              {activeMenu === article.id && (
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow z-10">
                  <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    ✕ Cancel
                  </button>
                  <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    ✓ Approve
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
