"use client";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

const users = [
  {
    id: 1,
    name: "Jenny Wilson",
    location: "Lagos, Nigeria",
    avatar: "/avatar-1.jpg",
  },
  {
    id: 2,
    name: "Wade Warren",
    location: "Lagos, Nigeria",
    avatar: "/avatar-2.jpg",
  },
  {
    id: 3,
    name: "Eleanor Pena",
    location: "Lagos, Nigeria",
    avatar: "/avatar-4.jpg",
  },
  {
    id: 4,
    name: "Annette Black",
    location: "Lagos, Nigeria",
    avatar: "/avatar-3.jpg",
  },
  {
    id: 5,
    name: "Ralph Edwards",
    location: "Lagos, Nigeria",
    avatar: "/avatar.jpg",
  },
];

export default function ManageUsersPage() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
      
      {/* Header in Separate White Background */}
      <div className=" px-4 py-3  mb-4 ">
        <h2 className="text-xl font-semibold text-gray-900">Manage Users</h2>
      </div>

      {/* User List */}
      <div className="bg-white rounded-xl shadow-sm divide-y">
        {users.map((user) => (
          <div
            key={user.id}
            className="relative flex items-center justify-between px-4 py-6 sm:py-5"
          >
            {/* Avatar + Info */}
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-black overflow-hidden">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-gray-500">{user.location}</p>
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
                  setActiveMenu(activeMenu === user.id ? null : user.id)
                }
                className="p-2"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {activeMenu === user.id && (
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
