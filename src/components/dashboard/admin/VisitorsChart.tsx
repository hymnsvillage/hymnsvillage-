type VisitorsChartProps = {
  data: { day: string; count: number }[];
};

const VisitorsChart = ({ data }: VisitorsChartProps) => (
  <div className="bg-white p-4 rounded-xl shadow w-full">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-gray-700 font-semibold">Visitors</h2>
      <select className="text-sm border p-1 rounded" disabled>
        <option>Weekly</option>
      </select>
    </div>
    <div className="flex space-x-2 h-32 items-end">
      {data.map(({ count }, i) => (
        <div
          key={i}
          className="bg-gray-300 rounded w-6"
          style={{ height: `${count * 5}px` }}
        ></div>
      ))}
    </div>
    <div className="flex justify-between text-xs text-gray-500 mt-2">
      {data.map(({ day }) => (
        <span key={day}>{day}</span>
      ))}
    </div>
  </div>
);

export default VisitorsChart;
