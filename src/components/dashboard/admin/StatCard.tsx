import { FC, ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string;
  icon: ReactNode;
  color: string;
};

const StatCard: FC<StatCardProps> = ({ label, value, icon, color }) => (
  <div className="rounded-xl border bg-white p-4 shadow-sm flex flex-col justify-between min-w-[140px]">
    <div className="flex items-center space-x-2">
      <div className={`${color}`}>{icon}</div>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
    <h2 className="text-2xl font-semibold">{value}</h2>
  </div>
);

export default StatCard;
