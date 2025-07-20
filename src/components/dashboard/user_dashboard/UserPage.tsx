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
import { useEffect, useState } from "react";

type UserProfile = {
  id: string;
  name: string;
  avatar_url: string;
};

export default function UserDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [analyticsData, setAnalyticsData] = useState<
    { name: string; views: number }[]
  >([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const [overview, setOverview] = useState({
    posts: 0,
    followers: 0,
    likes: 0,
    impressions: 0,
  });

  const [recentComments, setRecentComments] = useState<
    { id: number; name: string; text: string; avatar: string }[]
  >([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const topShares = [
    { id: 1, icon: Facebook, color: "bg-[#0078D4]", count: 150 },
    { id: 2, icon: X, color: "bg-[#333]", count: 100 },
    { id: 3, icon: Instagram, color: "bg-[#FF0000]", count: 120 },
    { id: 4, icon: Linkedin, color: "bg-[#0A66C2]", count: 95 },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const text = await res.text();
        let json;
        try {
          json = JSON.parse(text);
        } catch {
          console.error("Expected JSON but got HTML:", text.slice(0, 100));
          return;
        }
        if (json?.data?.id) {
          setUser({
            id: json.data.id,
            name: json.data.name,
            avatar_url: json.data.avatarUrl || "/default-avatar.png",
          });
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch("/api/user/dashboard/overview");
        const json = await res.json();
        if (json?.data) {
          setOverview(json.data);
        }
      } catch (error) {
        console.error("Failed to load overview:", error);
      }
    };
    fetchOverview();
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/user/dashboard/analytics");
        const text = await res.text();
        let json;
        try {
          json = JSON.parse(text);
        } catch {
          console.error("Analytics response was not JSON:", text.slice(0, 100));
          return;
        }

        const dailyCounts = json?.data?.dailyCounts || {};
        const formatted = Object.entries(dailyCounts).map(
          ([dateStr, count]) => {
            const date = new Date(dateStr);
            const day = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            return { name: day, views: Number(count) };
          }
        );

        setAnalyticsData(formatted);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setAnalyticsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/user/dashboard/recent-comments");
        const text = await res.text();

        let json;
        try {
          json = JSON.parse(text);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          console.error("Comments JSON error:", text.slice(0, 100));
          return;
        }

        const rawComments = json?.data?.comments || [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted = rawComments.map((c: any) => ({
          id: c.id,
          name: c.users?.name || "Anonymous",
          text: c.content,
          avatar: c.users?.avatar_url || "/default-avatar.png",
        }));

        setRecentComments(formatted);
      } catch (err) {
        console.error("Failed to fetch recent comments:", err);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-[#f5f6f8] border-t-3 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Dashboard
        </h2>
        {loading ? (
          <p className="text-sm text-gray-500">Loading user...</p>
        ) : user ? (
          <div className="flex items-center gap-3">
            <Image
              src={user.avatar_url}
              alt="User avatar"
              width={36}
              height={36}
              className="w-9 h-9 rounded-full ring-2 ring-black object-cover"
            />
            <span className="text-gray-700 font-medium">{user.name}</span>
          </div>
        ) : (
          <p className="text-sm text-red-500">User not found</p>
        )}
      </div>

      {/* Dashboard Stats and Views Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 1, icon: MessageSquare, value: overview.posts, label: "Posts" },
              { id: 2, icon: Users, value: overview.followers, label: "Followers" },
              { id: 3, icon: ThumbsUp, value: overview.likes, label: "Likes" },
              { id: 4, icon: Eye, value: overview.impressions, label: "Impressions" },
            ].map((card) => (
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

          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-900">Views</h3>
              <select className="text-sm border rounded px-2 py-1">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
            </div>
            {analyticsLoading ? (
              <div className="h-[200px] flex items-center justify-center text-gray-500">
                Loading chart...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Bar dataKey="views" fill="#7EF95A" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Comments & Shares */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-900">Recent Comments</h3>
              <button className="text-gray-500">•••</button>
            </div>

            {commentsLoading ? (
              <p className="text-gray-500 text-sm">Loading comments...</p>
            ) : recentComments.length === 0 ? (
              <p className="text-gray-400 text-sm">No recent comments yet.</p>
            ) : (
              <div className="space-y-4">
                {recentComments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <Image
                      src={comment.avatar}
                      alt={comment.name}
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-black"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{comment.name}</p>
                      <p className="text-gray-500 text-xs">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Top Social Media Shared</h3>
            <div className="space-y-4">
              {topShares.map(({ id, icon: Icon, color, count }) => (
                <div key={id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full">
                    <div
                      className={`h-4 ${color} rounded-full`}
                      style={{ width: `${(count / 150) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm font-medium w-10 text-right">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
