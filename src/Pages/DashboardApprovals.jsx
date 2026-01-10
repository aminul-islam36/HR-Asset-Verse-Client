import { useState } from "react";
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Swal from "sweetalert2";

const DashboardApprovals = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Use user and role for conditional rendering and access control
  console.log("Current user:", user?.email, "Role:", role);

  // Sample data for approval metrics
  const approvalMetricsData = [
    { month: "Jan", approved: 28, rejected: 4, pending: 8 },
    { month: "Feb", approved: 35, rejected: 3, pending: 12 },
    { month: "Mar", approved: 42, rejected: 5, pending: 6 },
    { month: "Apr", approved: 38, rejected: 7, pending: 15 },
    { month: "May", approved: 45, rejected: 3, pending: 9 },
    { month: "Jun", approved: 52, rejected: 6, pending: 18 },
  ];

  // Sample data for approval time distribution
  const approvalTimeData = [
    { timeRange: "< 1 day", count: 45, color: "#22c55e" },
    { timeRange: "1-3 days", count: 32, color: "#60a5fa" },
    { timeRange: "3-7 days", count: 18, color: "#f59e0b" },
    { timeRange: "> 7 days", count: 8, color: "#ef4444" },
  ];

  // Sample pending approvals data
  const pendingApprovals = [
    {
      id: 1,
      employee: "Alice Johnson",
      asset: "MacBook Air M2",
      requestDate: "2024-01-08",
      priority: "high",
      department: "Engineering",
      reason: "Development work requires latest hardware",
      estimatedCost: "$1,299",
    },
    {
      id: 2,
      employee: "Bob Smith",
      asset: "4K Monitor",
      requestDate: "2024-01-07",
      priority: "medium",
      department: "Design",
      reason: "Better display for design work",
      estimatedCost: "$399",
    },
    {
      id: 3,
      employee: "Carol Davis",
      asset: "Wireless Headphones",
      requestDate: "2024-01-06",
      priority: "low",
      department: "Marketing",
      reason: "For video calls and meetings",
      estimatedCost: "$199",
    },
    {
      id: 4,
      employee: "David Wilson",
      asset: "Standing Desk",
      requestDate: "2024-01-05",
      priority: "medium",
      department: "HR",
      reason: "Ergonomic workspace improvement",
      estimatedCost: "$599",
    },
    {
      id: 5,
      employee: "Eva Brown",
      asset: "External SSD",
      requestDate: "2024-01-04",
      priority: "high",
      department: "Engineering",
      reason: "Additional storage for project files",
      estimatedCost: "$149",
    },
  ];

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      high: "badge badge-error",
      medium: "badge badge-warning",
      low: "badge badge-info",
    };
    return priorityClasses[priority] || "badge badge-neutral";
  };

  const handleApprove = (id, employeeName, asset) => {
    Swal.fire({
      title: "Approve Request?",
      text: `Approve ${asset} request for ${employeeName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Approved!",
          text: "The request has been approved successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        // Here you would typically update the state or make an API call
      }
    });
  };

  const handleReject = (id, employeeName, asset) => {
    Swal.fire({
      title: "Reject Request?",
      text: `Reject ${asset} request for ${employeeName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
      input: "textarea",
      inputPlaceholder: "Please provide a reason for rejection...",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide a reason for rejection!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Rejected!",
          text: "The request has been rejected.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        // Here you would typically update the state or make an API call
      }
    });
  };

  const filteredApprovals = pendingApprovals.filter((approval) => {
    if (selectedFilter === "all") return true;
    return approval.priority === selectedFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral">Approvals Dashboard</h1>
        <p className="text-secondary mt-2">
          Manage and track asset request approvals
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Pending Approvals
              </p>
              <p className="text-2xl font-bold text-neutral">
                {pendingApprovals.length}
              </p>
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
            <span className="text-warning text-sm">Requires action</span>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Approved Today
              </p>
              <p className="text-2xl font-bold text-neutral">8</p>
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
            <span className="text-success text-sm">Great progress!</span>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Avg. Approval Time
              </p>
              <p className="text-2xl font-bold text-neutral">1.8</p>
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
          <div className="mt-2">
            <span className="text-info text-sm">Faster than target</span>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Approval Rate
              </p>
              <p className="text-2xl font-bold text-neutral">87%</p>
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-primary text-sm">Above target</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Approval Metrics Area Chart */}
        <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
          <h3 className="text-lg font-semibold text-neutral mb-4">
            Approval Metrics Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={approvalMetricsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="approved"
                stackId="1"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.6}
                name="Approved"
              />
              <Area
                type="monotone"
                dataKey="pending"
                stackId="1"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.6}
                name="Pending"
              />
              <Area
                type="monotone"
                dataKey="rejected"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
                name="Rejected"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Approval Time Distribution Pie Chart */}
        <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
          <h3 className="text-lg font-semibold text-neutral mb-4">
            Approval Time Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={approvalTimeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ timeRange, percent }) =>
                  `${timeRange} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {approvalTimeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Approvals Section */}
      <div className="bg-base-100 rounded-lg p-6 shadow-md border border-base-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral">
            Pending Approvals ({filteredApprovals.length})
          </h3>

          {/* Filter Dropdown */}
          <div className="flex gap-4 items-center">
            <select
              className="select select-bordered select-sm"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Asset</th>
                <th>Department</th>
                <th>Request Date</th>
                <th>Priority</th>
                <th>Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApprovals.map((approval) => (
                <tr key={approval.id}>
                  <td>
                    <div>
                      <div className="font-medium">{approval.employee}</div>
                      <div className="text-sm text-secondary">
                        {approval.department}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-medium">{approval.asset}</div>
                      <div className="text-sm text-secondary truncate max-w-xs">
                        {approval.reason}
                      </div>
                    </div>
                  </td>
                  <td>{approval.department}</td>
                  <td>{approval.requestDate}</td>
                  <td>
                    <span className={getPriorityBadge(approval.priority)}>
                      {approval.priority}
                    </span>
                  </td>
                  <td className="font-medium">{approval.estimatedCost}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleApprove(
                            approval.id,
                            approval.employee,
                            approval.asset
                          )
                        }
                        className="btn btn-success btn-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleReject(
                            approval.id,
                            approval.employee,
                            approval.asset
                          )
                        }
                        className="btn btn-error btn-xs"
                      >
                        Reject
                      </button>
                      <button className="btn btn-ghost btn-xs">Details</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApprovals.length === 0 && (
          <div className="text-center py-8">
            <p className="text-secondary">
              No pending approvals found for the selected filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardApprovals;
