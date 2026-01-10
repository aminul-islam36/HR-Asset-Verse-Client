import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Assets", value: 40 },
  { name: "Requests", value: 25 },
  { name: "Approved", value: 18 },
];

const HrDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">HR Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Total Assets</div>
          <div className="stat-value">40</div>
        </div>

        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Pending Requests</div>
          <div className="stat-value">25</div>
        </div>

        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Approved</div>
          <div className="stat-value">18</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-base-100 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Assets Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#570df8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HrDashboard;
