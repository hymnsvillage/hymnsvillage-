// components/VisitorsChart.tsx
const VisitorsChart = () => (
  <div className="bg-white p-4 rounded-xl shadow w-full">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-gray-700 font-semibold">Visitors</h2>
      <select className="text-sm border p-1 rounded">
        <option>Monthly</option>
        <option>Weekly</option>
      </select>
    </div>
    <div className="flex space-x-2 h-32 items-end">
      {[6, 8, 10, 7, 9, 11, 13].map((v, i) => (
        <div
          key={i}
          className="bg-gray-300 rounded w-6"
          style={{ height: `${v * 10}px` }}
        ></div>
      ))}
    </div>
    <div className="flex justify-between text-xs text-gray-500 mt-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
        <span key={day}>{day}</span>
      ))}
    </div>
  </div>
);

export default VisitorsChart;
