"use client";


import Topbar from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/user_dashboard/UserSidebar";
import UserDashboard from "@/components/dashboard/user_dashboard/UserPage";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Topbar />

      {/* Body (Sidebar + Content) */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Dashboard Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50 overflow-y-auto">
          <UserDashboard />
        </main>
      </div>
    </div>
  );
}
