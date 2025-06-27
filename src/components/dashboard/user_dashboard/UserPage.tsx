"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
  ThumbsUp,
  Users,
  Eye,
  X,
} from "lucide-react";
import Image from "next/image";

const statCards = [
  {
    id: 1,
    icon: MessageSquare,
    value: "150",
    label: "Post",
  },
  {
    id: 2,
    icon: Users,
    value: "569",
    label: "Followers",
  },
  {
    id: 3,
    icon: ThumbsUp,
    value: "12.38k",
    label: "Likes",
  },
  {
    id: 4,
    icon: Eye,
    value: "847.76k",
    label: "Impression",
  },
];

const barData = [
  { name: "Sun", views: 6000 },
  { name: "Mon", views: 8000 },
  { name: "Tue", views: 7000 },
  { name: "Wed", views: 10000 },
  { name: "Thu", views: 11000 },
  { name: "Fri", views: 9000 },
  { name: "Sat", views: 12000 },
];

const recentComments = [
  {
    id: 1,
    name: "Henry Arthur",
    text: "This is great, thanks for sharing.",
    avatar: "/users/user1.png",
  },
  {
    id: 2,
    name: "Darrell Steward",
    text: "Very insightful article. I loved it!",
    avatar: "/users/user2.png",
  },
  {
    id: 3,
    name: "Jane Cooper",
    text: "Couldn’t agree more with this point.",
    avatar: "/users/user3.png",
  },
  {
    id: 4,
    name: "Jerome Bell",
    text: "I learned a lot. Keep it up!",
    avatar: "/users/user4.png",
  },
];

const topShares = [
  { id: 1, icon: Facebook, color: "bg-[#0078D4]", count: 150 },
  { id: 2, icon: X, color: "bg-[#333]", count: 100 },
  { id: 3, icon: Instagram, color: "bg-[#FF0000]", count: 120 },
  { id: 4, icon: Linkedin, color: "bg-[#0A66C2]", count: 95 },
];

export default function UserDashboard() {
  return (
    <div className="p-6 space-y-6 bg-[#f5f6f8] border-t-3 min-h-screen">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Stats + Chart */}
        <div className="lg:col-span-2 space-y-4">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statCards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col items-start gap-2 bg-white p-4 rounded-xl shadow-sm border"
              >
                <div className="bg-green-500 text-white p-2 rounded-full">
                  <card.icon className="w-5 h-5" />
                </div>
                <div className="text-xl font-semibold">{card.value}</div>
                <div className="text-sm text-gray-500">{card.label}</div>
              </div>
            ))}
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-900">Views</h3>
              <select className="text-sm border rounded px-2 py-1">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Bar dataKey="views" fill="#7EF95A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Recent Comments + Top Shares */}
        <div className="space-y-4">
          {/* Recent Comments */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-900">
                Recent Comment
              </h3>
              <button className="text-gray-500">•••</button>
            </div>
            <div className="space-y-4">
              {recentComments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <Image
                    src={comment.avatar}
                    alt={comment.name}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full ring-2 ring-black object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      {comment.name}
                    </p>
                    <p className="text-gray-500 text-xs">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Social Media Shared */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Top Social Media Shared
            </h3>
            <div className="space-y-4">
              {topShares.map(({ id, icon: Icon, color, count }) => (
                <div key={id} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${color}`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full">
                    <div
                      className={`h-4 ${color} rounded-full`}
                      style={{ width: `${(count / 150) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm font-medium w-10 text-right">
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
