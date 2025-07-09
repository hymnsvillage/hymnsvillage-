'use client';

import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Sidebar from '@/components/dashboard/Sidebar';
import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [activeMobileView, setActiveMobileView] = useState<'sidebar' | 'content'>('sidebar');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <DashboardHeader />

      {/* Mobile View */}
      <div className="flex-1 md:hidden">
        {activeMobileView === 'sidebar' ? (
          <aside className="bg-white border-t h-full p-4">
            <Sidebar onNavigate={() => setActiveMobileView('content')} />
          </aside>
        ) : (
          <main className="bg-gray-50 p-4">
            {/* Back button */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setActiveMobileView('sidebar')}
                className="text-gray-600 hover:text-black"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            {children}
          </main>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <aside className="w-64 bg-white border-r overflow-y-auto">
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
