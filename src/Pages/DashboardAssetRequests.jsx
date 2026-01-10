import { Link } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import DashboardLayout from "../Layouts/DashboardLayout";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardAssetRequests = () => {
  const { user } = useAuth();
  const { role } = useRole();

  // Log user info for debugging
  console.log("Dashboard user:", user?.email, "Role:", role);

  // Sample data for asset requests over time
  const requestsTrendData = [
    { month: "Jan", total: 12, pending: 3, approved: 8, rejected: 1 },
    { month: "Feb", total: 19, pending: 5, approved: 12, rejected: 2 },
    { month: "Mar", total: 15, pending: 2, approved: 11, rejected: 2 },
    { month: "Apr", total: 25, pending: 8, approved: 15, rejected: 2 },
    { month: "May", total: 22, pending: 6, approved: 14, rejected: 2 },
    { month: "Jun", total: 30, pending: 12, approved: 16, rejected: 2 },
  ];

  // Sample data for asset types requested
  const assetTypeData = [
    { type: "Laptops", count: 45, color: "#60a5fa" },
    { type: "Monitors", count: 32, color: "#22c55e" },
    { type: "Keyboards", count: 28, color: "#f59e0b" },
    { type: "Mice", count: 25, color: "#ef4444" },
    { type: "Headphones", count: 18, color: "#8b5cf6" },
    { type: "Others", count: 12, color: "#06b6d4" },
  ];

  // Sample recent requests data
  const recentRequests = [
    {
      id: 1,
      employee: "John Doe",
      asset: "MacBook Pro",
      date: "2024-01-08",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      employee: "Jane Smith",
      asset: "Dell Monitor",
      date: "2024-01-07",
      status: "approved",
      priority: "medium",
    },
    {
      id: 3,
      employee: "Mike Johnson",
      asset: "Wireless Mouse",
      date: "2024-01-06",
      status: "pending",
      priority: "low",
    },
    {
      id: 4,
      employee: "Sarah Wilson",
      asset: "Mechanical Keyboard",
      date: "2024-01-05",
      status: "rejected",
      priority: "medium",
    },
    {
      id: 5,
      employee: "David Brown",
      asset: "Noise Cancelling Headphones",
      date: "2024-01-04",
      status: "approved",
      priority: "high",
    },
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "badge badge-warning",
      approved: "badge badge-success",
      rejected: "badge badge-error",
    };
    return statusClasses[status] || "badge badge-neutral";
  };

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      high: "badge badge-error badge-outline",
      medium: "badge badge-warning badge-outline",
      low: "badge badge-info badge-outline",
    };
    return priorityClasses[priority] || "badge badge-neutral badge-outline";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral">
          Asset Requests Dashboard
        </h1>
        <p className="text-secondary mt-2">
          Track and analyze asset request patterns
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Total Requests
              </p>
              <p className="text-2xl font-bold text-neutral">123</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-full">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-success text-sm">+12% from last month</span>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Pending Requests
              </p>
              <p className="text-2xl font-bold text-neutral">36</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-full">
              <svg
                className="w-6 h-6 text-warning"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-warning text-sm">Needs attention</span>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Approved This Month
              </p>
              <p className="text-2xl font-bold text-neutral">76</p>
            </div>
            <div className="p-3 bg-success/10 rounded-full">
              <svg
                className="w-6 h-6 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-success text-sm">85% approval rate</span>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Avg. Processing Time
              </p>
              <p className="text-2xl font-bold text-neutral">2.3</p>
              <p className="text-sm text-secondary">days</p>
            </div>
            <div className="p-3 bg-info/10 rounded-full">
              <svg
                className="w-6 h-6 text-info"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Requests Trend Line Chart */}
        <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
          <h3 className="text-lg font-semibold text-neutral mb-4">
            Request Trends Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={requestsTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#60a5fa"
                strokeWidth={3}
                name="Total Requests"
              />
              <Line
                type="monotone"
                dataKey="approved"
                stroke="#22c55e"
                strokeWidth={2}
                name="Approved"
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Pending"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Types Bar Chart */}
        <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
          <h3 className="text-lg font-semibold text-neutral mb-4">
            Most Requested Asset Types
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assetTypeData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="type" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral">
            Recent Asset Requests
          </h3>
          <Link to="/all-requests" className="btn btn-primary btn-sm">
            View All Requests
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Asset</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <div className="font-medium">{request.employee}</div>
                  </td>
                  <td>{request.asset}</td>
                  <td>{request.date}</td>
                  <td>
                    <span className={getPriorityBadge(request.priority)}>
                      {request.priority}
                    </span>
                  </td>
                  <td>
                    <span className={getStatusBadge(request.status)}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-xs">View</button>
                      {request.status === "pending" && role === "hr" && (
                        <>
                          <button className="btn btn-success btn-xs">
                            Approve
                          </button>
                          <button className="btn btn-error btn-xs">
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAssetRequests;
