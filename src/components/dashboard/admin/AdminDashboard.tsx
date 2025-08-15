"use client";

import { FC, useEffect, useState } from "react";
import StatCard from "./StatCard";
import NotificationPanel from "./NotificationPanel";
import VisitorsChart from "./VisitorsChart";
import { BookText, Music, Users, Eye } from "lucide-react";
import SocialMediaShare from "./SocialMediaShares";

type OverviewStats = {
  blogCount: number;
  hymnCount: number;
  userCount: number;
};

type Visitor = {
  day: string;
  count: number;
};

const AdminDashboard: FC = () => {
  const [overview, setOverview] = useState<OverviewStats>({
    blogCount: 0,
    hymnCount: 0,
    userCount: 0,
  });

  const [visitors, setVisitors] = useState<Visitor[]>([]);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const [overviewRes, visitorsRes] = await Promise.all([
          fetch("/api/admin/dashboard/overview"),
          fetch("/api/admin/dashboard/visitors"),
        ]);

        const overviewJson = await overviewRes.json();
        const visitorsJson = await visitorsRes.json();

        if (overviewJson?.data) setOverview(overviewJson.data);
        if (visitorsJson?.data) setVisitors(visitorsJson.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        // setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalVisitors = visitors.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="p-6 space-y-6 bg-[#f5f6f8] border-t-3 min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* TOP GRID: Stat Cards + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Stat Cards: 2x2 grid */}
        <div className="grid grid-cols-2 gap-4 col-span-2">
          <StatCard
            label="Articles"
            value={overview.blogCount.toLocaleString()}
            icon={<BookText size={18} />}
            color="text-yellow-500"
          />
          <StatCard
            label="Hymns"
            value={overview.hymnCount.toLocaleString()}
            icon={<Music size={18} />}
            color="text-blue-500"
          />
          <StatCard
            label="Registered Users"
            value={overview.userCount.toLocaleString()}
            icon={<Users size={18} />}
            color="text-purple-500"
          />
          <StatCard
            label="Visitors"
            value={totalVisitors.toLocaleString()}
            icon={<Eye size={18} />}
            color="text-green-500"
          />
        </div>

        {/* Notifications panel */}
        <NotificationPanel isAdmin={true} />
      </div>

      {/* BOTTOM GRID: Chart + Social Media */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Visitors Chart */}
        <div className="col-span-2">
          <VisitorsChart data={visitors} />
        </div>

        {/* Social media share */}
        <SocialMediaShare />
      </div>
    </div>
  );
};

export default AdminDashboard;
