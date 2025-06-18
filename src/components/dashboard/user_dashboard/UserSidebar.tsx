"use client";

import {
  Home,
  LayoutDashboard,
  Hash,
  Music,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/user" },
  { label: "Blog", icon: Hash, href: "/dashboard/user/userblog" },
  { label: "Hymns", icon: Music, href: "/dashboard/user/hymns" },
  { label: "Profile", icon: User, href: "/dashboard/user/profile" },
  { label: "Settings", icon: Settings, href: "/dashboard/user/settings" },
  { label: "Log Out", icon: LogOut, href: "/logout" },
];

export default function UserSidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r-1 p-5 border-t-4">
      <nav className="flex flex-col space-y-6 ">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 text-gray-700 hover:text-black text-sm font-medium"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
