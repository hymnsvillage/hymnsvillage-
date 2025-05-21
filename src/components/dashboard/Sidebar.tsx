"use client"
import { FC, JSX } from "react";
import {
  Home,
  LayoutDashboard,
  FileText,
  Music,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: JSX.Element;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Manage Articles", href: "/dashboard/admin/manage_articles", icon: <FileText className="w-5 h-5" /> },
  { label: "Manage Hymns", href: "/hymns", icon: <Music className="w-5 h-5" /> },
  { label: "Manage Users", href: "/dashboard/admin/users", icon: <Users className="w-5 h-5" /> },
  { label: "Settings", href: "/settings", icon: <Settings className="w-5 h-5" /> },
  { label: "Log Out", href: "/logout", icon: <LogOut className="w-5 h-5" /> },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r p-5 border-t-4">
      <nav className="flex flex-col space-y-6">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center space-x-3 text-sm font-medium transition ${
              pathname === item.href ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
