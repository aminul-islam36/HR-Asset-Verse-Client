import { useState, useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import useaxiosPublic from "../hooks/useAxiosPublic";

const Dashboard = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosPublic = useaxiosPublic();
  const [dashboardData, setDashboardData] = useState({
    totalAssets: 0,
    totalRequests: 0,
    pendingApprovals: 0,
    approvedRequests: 0,
    assignedAssets: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [approvalStats, setApprovalStats] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch assets data
        const assetsResponse = await axiosPublic.get("/assets");
        const assets = assetsResponse.data || [];

        // Fetch requests/assignments data
        const requestsResponse = await axiosPublic.get("/asset-requests");
        const requests = requestsResponse.data || [];

        // Calculate total assets
        const totalAssets = assets.length;

        // Calculate total requests
        const totalRequests = requests.length;

        // Calculate status-based statistics
        const assignedRequests = requests.filter(
          (req) => req.status === "assigned"
        ).length;
        const pendingRequests = requests.filter(
          (req) => req.status === "pending"
        ).length;
        const rejectedRequests = requests.filter(
          (req) => req.status === "rejected"
        ).length;

        // Calculate monthly data for the last 6 months
        const monthlyStats = calculateMonthlyStats(requests);

        // Calculate approval statistics
        const totalStatusRequests =
          assignedRequests + pendingRequests + rejectedRequests;
        const approvalPercentages = {
          approved:
            totalStatusRequests > 0
              ? Math.round((assignedRequests / totalStatusRequests) * 100)
              : 0,
          pending:
            totalStatusRequests > 0
              ? Math.round((pendingRequests / totalStatusRequests) * 100)
              : 0,
          rejected:
            totalStatusRequests > 0
              ? Math.round((rejectedRequests / totalStatusRequests) * 100)
              : 0,
        };

        setDashboardData({
          totalAssets,
          totalRequests,
          pendingApprovals: pendingRequests,
          approvedRequests: assignedRequests,
          assignedAssets: assignedRequests,
        });

        setMonthlyData(monthlyStats);
        setApprovalStats(approvalPercentages);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Set default values on error
        setDashboardData({
          totalAssets: 0,
          totalRequests: 0,
          pendingApprovals: 0,
          approvedRequests: 0,
          assignedAssets: 0,
        });
        setMonthlyData([]);
        setApprovalStats({ approved: 0, pending: 0, rejected: 0 });
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchDashboardData();
    }
  }, [user?.email, axiosPublic]);

  const calculateMonthlyStats = (requests) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentDate = new Date();
    const monthlyStats = [];

    // Get last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();
      const month = date.getMonth();

      const monthRequests = requests.filter((req) => {
        const reqDate = new Date(req.assignmentDate || req.dateAdded);
        return reqDate.getFullYear() === year && reqDate.getMonth() === month;
      });

      const totalRequests = monthRequests.length;
      const approvedRequests = monthRequests.filter(
        (req) => req.status === "assigned"
      ).length;
      const percentage =
        totalRequests > 0
          ? Math.round((approvedRequests / totalRequests) * 100)
          : 0;

      monthlyStats.push({
        month: monthName,
        requests: totalRequests,
        approved: approvedRequests,
        percentage: percentage,
      });
    }

    return monthlyStats;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral">Dashboard Overview</h1>
        <p className="text-secondary mt-2">
          Welcome back, {user?.displayName || user?.email}
        </p>
        <p className="text-sm text-secondary capitalize">Role: {role}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">Total Assets</p>
              <p className="text-3xl font-bold text-neutral mt-2">
                {dashboardData.totalAssets}
              </p>
              <p className="text-xs text-info mt-1">Available in inventory</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Total Requests
              </p>
              <p className="text-3xl font-bold text-neutral mt-2">
                {dashboardData.totalRequests}
              </p>
              <p className="text-xs text-info mt-1">All time requests</p>
            </div>
            <div className="p-4 bg-info/10 rounded-xl">
              <svg
                className="w-8 h-8 text-info"
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
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Pending Approvals
              </p>
              <p className="text-3xl font-bold text-neutral mt-2">
                {dashboardData.pendingApprovals}
              </p>
              <p className="text-xs text-warning mt-1">
                {dashboardData.pendingApprovals > 0
                  ? "Needs attention"
                  : "All caught up"}
              </p>
            </div>
            <div className="p-4 bg-warning/10 rounded-xl">
              <svg
                className="w-8 h-8 text-warning"
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
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Assigned Assets
              </p>
              <p className="text-3xl font-bold text-neutral mt-2">
                {dashboardData.assignedAssets}
              </p>
              <p className="text-xs text-success mt-1">Successfully assigned</p>
            </div>
            <div className="p-4 bg-success/10 rounded-xl">
              <svg
                className="w-8 h-8 text-success"
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
        </div>
      </div>

      {/* Charts Section - Pure CSS Implementation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Requests Bar Chart */}
        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
          <h3 className="text-xl font-semibold text-neutral mb-6">
            Monthly Asset Requests (Last 6 Months)
          </h3>
          {monthlyData.length > 0 ? (
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-secondary">
                    {data.month}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-neutral">
                        {data.requests} requests
                      </span>
                      <span className="text-sm text-success">
                        {data.approved} assigned
                      </span>
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-3 relative overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${Math.min(
                            (data.requests /
                              Math.max(
                                ...monthlyData.map((m) => m.requests),
                                1
                              )) *
                              100,
                            100
                          )}%`,
                        }}
                      ></div>
                      <div
                        className="bg-success h-full rounded-full absolute top-0 left-0 transition-all duration-700 ease-out"
                        style={{
                          width: `${Math.min(
                            (data.approved /
                              Math.max(
                                ...monthlyData.map((m) => m.requests),
                                1
                              )) *
                              100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-medium text-neutral">
                      {data.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-secondary">
              <p>No request data available</p>
            </div>
          )}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-base-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-secondary">Total Requests</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-secondary">Assigned</span>
            </div>
          </div>
        </div>

        {/* Approval Status Pie Chart */}
        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
          <h3 className="text-xl font-semibold text-neutral mb-6">
            Request Status Distribution
          </h3>
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-48 h-48">
              {/* Pie Chart using CSS */}
              <div className="w-full h-full rounded-full relative overflow-hidden">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(
                        from 0deg,
                        hsl(var(--success)) 0deg ${
                          (approvalStats.approved / 100) * 360
                        }deg,
                        hsl(var(--warning)) ${
                          (approvalStats.approved / 100) * 360
                        }deg ${
                      ((approvalStats.approved + approvalStats.pending) / 100) *
                      360
                    }deg,
                        hsl(var(--error)) ${
                          ((approvalStats.approved + approvalStats.pending) /
                            100) *
                          360
                        }deg 360deg
                      )`,
                  }}
                ></div>
                <div className="absolute inset-6 bg-base-100 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neutral">
                      {dashboardData.totalRequests}
                    </div>
                    <div className="text-sm text-secondary">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-success rounded-full"></div>
                <span className="font-medium text-neutral">Assigned</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-neutral">
                  {dashboardData.assignedAssets}
                </div>
                <div className="text-sm text-secondary">
                  {approvalStats.approved}%
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-warning rounded-full"></div>
                <span className="font-medium text-neutral">Pending</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-neutral">
                  {dashboardData.pendingApprovals}
                </div>
                <div className="text-sm text-secondary">
                  {approvalStats.pending}%
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-error/10 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-error rounded-full"></div>
                <span className="font-medium text-neutral">Rejected</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-neutral">
                  {dashboardData.totalRequests -
                    dashboardData.assignedAssets -
                    dashboardData.pendingApprovals}
                </div>
                <div className="text-sm text-secondary">
                  {approvalStats.rejected}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
        <h3 className="text-xl font-semibold text-neutral mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/dashboard/asset-requests"
            className="btn btn-primary btn-lg flex items-center gap-3 h-16"
          >
            <svg
              className="w-6 h-6"
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
            View Asset Requests
          </Link>
          <Link
            to="/dashboard/approvals"
            className="btn btn-success btn-lg flex items-center gap-3 h-16"
          >
            <svg
              className="w-6 h-6"
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
            Manage Approvals
          </Link>
          <Link
            to="/add-asset"
            className="btn btn-info btn-lg flex items-center gap-3 h-16"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add New Asset
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
