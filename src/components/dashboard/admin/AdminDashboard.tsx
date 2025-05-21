import { FC } from "react";
import StatCard from "./StatCard";
import NotificationPanel from "./NotificationPanel";
import { BookText, Music, Users, Eye } from "lucide-react";
import BarChart from "./Barchart";
import SocialMediaShare from "./SocialMediaShares";


const AdminDashboard: FC = () => {
  return (
    <div className="p-6 space-y-6 bg-[#f5f6f8] border-t-3 min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* TOP GRID: Stat Cards + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Stat Cards: 2x2 grid */}
        <div className="grid grid-cols-2 gap-4 col-span-2">
          <StatCard
            label="Articles"
            value="150k"
            icon={<BookText size={18} />}
            color="text-yellow-500"
          />
          <StatCard
            label="Hymns"
            value="569"
            icon={<Music size={18} />}
            color="text-blue-500"
          />
          <StatCard
            label="Register Users"
            value="12.38k"
            icon={<Users size={18} />}
            color="text-purple-500"
          />
          <StatCard
            label="Visitors"
            value="847.76k"
            icon={<Eye size={18} />}
            color="text-green-500"
          />
        </div>

        {/* Notifications panel */}
        <NotificationPanel />
      </div>

      {/* BOTTOM GRID: Chart + Social Media */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart: 2/3 width */}
        <div className="col-span-2">
          <BarChart />
        </div>

        {/* Social media shared */}
        <SocialMediaShare />
      </div>
    </div>
  );
};

export default AdminDashboard;
