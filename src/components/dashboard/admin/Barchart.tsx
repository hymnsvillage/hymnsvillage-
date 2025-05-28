"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState } from "react";

const chartData = {
  Daily: [
    { name: "Sun", value: 6000 },
    { name: "Mon", value: 8000 },
    { name: "Tue", value: 6500 },
    { name: "Wed", value: 10000 },
    { name: "Thu", value: 11000 },
    { name: "Fri", value: 8500 },
    { name: "Sat", value: 12500 },
  ],
  Weekly: [
    { name: "Sun", value: 4000 },
    { name: "Mon", value: 7600 },
    { name: "Tue", value: 6100 },
    { name: "Wed", value: 9000 },
    { name: "Thu", value: 10400 },
    { name: "Fri", value: 8700 },
    { name: "Sat", value: 12000 },
  ],
  Monthly: [
    { name: "Sun", value: 5000 },
    { name: "Mon", value: 7200 },
    { name: "Tue", value: 5800 },
    { name: "Wed", value: 9600 },
    { name: "Thu", value: 11200 },
    { name: "Fri", value: 8800 },
    { name: "Sat", value: 12600 },
  ],
};

type ChartOption = keyof typeof chartData;

const VisitorsBarChart = () => {
  const [selected, setSelected] = useState<ChartOption>("Daily");
  const data = chartData[selected];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-semibold text-gray-800">Visitors</h2>

        <Select value={selected} onValueChange={(value: ChartOption) => setSelected(value)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Daily">Daily</SelectItem>
            <SelectItem value="Weekly">Weekly</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barCategoryGap={25}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            domain={[4000, 14000]}
            ticks={[4000, 6000, 8000, 10000, 12000]}
            tickFormatter={(v) => `${v / 1000}k`}
          />
          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            fill="#d1d5db"
            isAnimationActive={false}
          >
            {
              // Highlight the last bar (Saturday)
              data.map((entry, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={index === data.length - 1 ? "#111827" : "#d1d5db"}
                />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsBarChart;
