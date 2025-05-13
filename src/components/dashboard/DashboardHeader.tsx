'use client';

import Image from 'next/image';
import { LuBell } from 'react-icons/lu';

export default function DashboardHeader() {
  const notificationCount = 3;

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm text-black">
      {/* Left: Logo & Title */}
      <div className="flex items-center gap-2">
        <Image
          src="/logo 1.png"
          alt="Hymns Village Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="font-semibold text-lg">Hymns Village</span>
      </div>

      {/* Center: Search Input */}
      <div className="flex-1 mx-6 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-3 top-2.5 text-black">
            🔍
          </span>
        </div>
      </div>

      {/* Right: Notification & Avatar */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <div className="relative">
          <LuBell className="w-6 h-6 text-gray-600 cursor-pointer" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {notificationCount}
            </span>
          )}
        </div>

        {/* Avatar */}
        <Image
          src="/avatar-1.jpg"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </header>
  );
}
