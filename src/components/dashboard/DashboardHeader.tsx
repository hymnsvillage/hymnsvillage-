"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bell, Search } from "lucide-react";

export default function Topbar() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm w-full relative">
      {/* Logo and name */}
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="rounded-full "
        />
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Hymns Village
        </span>
      </div>

      {/* Centered Search Bar - only visible on desktop */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md hidden sm:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Anything ..."
            className="w-full border border-gray-200 rounded-full py-1.5 pl-10 pr-4 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-800"
          />
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 ring-2 ring-gray rounded-full" />
        </div>
      </div>

      {/* Notification and Avatar */}
      <div className="flex items-center space-x-4">
        {/* Notification with black ring */}
        <button
          onClick={() => router.push("/dashboard/admin/notification")}
          className="rounded-full ring-2 ring-gray p-1.5 hover:bg-gray-100"
        >
          <Bell className="w-5 h-5 text-gray-600" />
        </button>

        {/* Avatar with black ring */}
        <div className="w-9 h-9 rounded-full ring-2 ring-gray-500 overflow-hidden">
          <Image
            src="/avatar.jpg"
            alt="Admin Avatar"
            width={36}
            height={36}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
