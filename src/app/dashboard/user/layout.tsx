"use client";
import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ReactNode } from "react";
import UserSidebar from "@/components/dashboard/user_dashboard/UserSidebar";
import { Menu, X } from "lucide-react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-2 md:px-6">
        {/* Hamburger on LEFT (move to right if you prefer) */}
        <button
          className="md:hidden text-gray-700 mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <DashboardHeader />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Desktop) */}
        <aside className="w-64 hidden md:block bg-white border-r overflow-y-auto">
          <UserSidebar />
        </aside>

        {/* Sidebar (Mobile Drawer) */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Slide-in sidebar */}
            <div className="relative w-64 bg-white h-full shadow-lg">
              <UserSidebar closeSidebar={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
