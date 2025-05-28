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
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Blog", icon: Hash, href: "/blog" },
  { label: "Hymns", icon: Music, href: "/hymns" },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Log Out", icon: LogOut, href: "/logout" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-56 min-h-screen bg-white border-r px-5 py-6 flex-col">
      <nav className="flex flex-col gap-6 ">
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
