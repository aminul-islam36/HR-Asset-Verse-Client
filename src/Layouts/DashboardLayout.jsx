import { useState } from "react";
import { Link, useLocation, Navigate, Outlet } from "react-router";
import {
  IoMdHome,
  IoMdDocument,
  IoMdCheckboxOutline,
  IoMdMenu,
  IoMdClose,
  IoMdArrowBack,
  IoMdPerson,
} from "react-icons/io";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../Components/Loading";
import DashboardHeader from "../Components/DashboardHeader";

const DashboardLayout = () => {
  const { user, isLoading } = useAuth();
  const { role, roleLoading } = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Dashboard navigation items
  const dashboardNavItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: IoMdHome,
      description: "Dashboard overview and statistics",
    },
    {
      name: "Asset Requests",
      href: "/dashboard/asset-requests",
      icon: IoMdDocument,
      description: "Track and analyze asset requests",
    },
    {
      name: "Approvals",
      href: "/dashboard/approvals",
      icon: IoMdCheckboxOutline,
      description: "Manage pending approvals",
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: IoMdPerson,
      description: "Manage your profile settings",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Show loading state
  if (isLoading || roleLoading) {
    return <Loading />;
  }

  // Redirect non-HR users
  if (!user || (role !== "Hr" && role !== "hr")) {
    return <Navigate to="/" replace />;
  }

  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="h-screen bg-base-200">
      {/* Dashboard Header */}
      {/* <DashboardHeader /> */}
      {/* Mobile Header */}

      <div className="lg:hidden bg-base-300 border-b border-base-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="btn btn-ghost btn-square text-base-content"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <IoMdClose className="h-6 w-6" />
            ) : (
              <IoMdMenu className="h-6 w-6" />
            )}
          </button>
          <h1 className="text-xl font-bold text-neutral">
            <Link to="/">Back To Home</Link>
          </h1>
          <div></div> {/* Spacer */}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-base-300 border-r border-base-200 transform transition-transform duration-200 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          {/* Desktop Header */}
          <div className="hidden lg:block p-6 border-b border-base-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-neutral">Dashboard</h1>
              <Link
                to="/"
                className="btn btn-ghost btn-sm tooltip tooltip-bottom"
                data-tip="Go home"
              >
                <IoMdArrowBack className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-sm text-secondary mt-2">
              Welcome, {user?.displayName || user?.email}
            </p>
          </div>

          {/* Navigation */}
          <nav className="p-4 lg:p-6">
            <ul className="menu menu-vertical gap-2">
              {dashboardNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={closeSidebar}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg transition-colors
                        ${
                          isActive
                            ? "bg-primary text-primary-content shadow-md"
                            : "hover:bg-base-200 text-base-content"
                        }
                      `}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item.name}</div>
                        <div
                          className={`text-xs mt-1 ${
                            isActive
                              ? "text-primary-content/80"
                              : "text-secondary"
                          }`}
                        >
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 border-t border-base-200">
            <div className="text-center">
              <p className="text-xs text-secondary">
                HR Asset Management System
              </p>
              <p className="text-xs text-secondary mt-1">Dashboard v1.0</p>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 overflow-y-auto">
          <div className="p-4 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
