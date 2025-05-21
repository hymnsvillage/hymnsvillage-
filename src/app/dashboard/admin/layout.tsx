import React from 'react'
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";


type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header at top */}
      <DashboardHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <aside className="w-64 hidden md:block bg-white border-r overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
