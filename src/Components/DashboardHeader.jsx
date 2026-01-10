import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import Logo from "./Logo";
import Swal from "sweetalert2";
import { IoMdLogOut, IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import useRole from "../hooks/useRole";

const DashboardHeader = () => {
  const { user, logOutUser } = useAuth();
  const { role } = useRole();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsProfileMenuOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-base-300 shadow-lg border-b border-base-200">
      <div className="navbar h-16 max-w-7xl mx-auto px-4 lg:px-6">
        {/* Left side - Logo and Back button */}
        <div className="navbar-start">
          <Logo />
        </div>

        {/* Center - Dashboard Title */}
        <div className="navbar-center">
          <h1 className="text-xl font-bold text-neutral">HR Dashboard</h1>
        </div>

        {/* Right side - Back button and User profile */}
        <div className="navbar-end gap-2">
          {/* Back to Main Site */}
          <NavLink
            to="/"
            className="btn btn-ghost btn-sm"
            aria-label="Back to main site"
          >
            <IoMdArrowBack className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Site</span>
          </NavLink>

          {/* User Profile */}
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                onClick={toggleProfileMenu}
                className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition-colors"
                aria-label="User profile menu"
              >
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-300">
                  <img
                    src={
                      user.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/219/219983.png"
                    }
                    alt="User profile"
                    className="rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-64 p-3 shadow-xl border border-base-200 text-base-content">
                  {/* User Info Header */}
                  <li className="menu-title text-neutral font-semibold mb-2 px-3">
                    <div className="flex items-center gap-2">
                      <span className="truncate">
                        {user.displayName || user.email || "User"}
                      </span>
                    </div>
                    <span className="text-xs text-secondary capitalize mt-1">
                      {role || "HR Manager"}
                    </span>
                  </li>

                  <div className="divider my-1"></div>

                  {/* Quick Actions */}
                  <li>
                    <NavLink to="/profile" onClick={closeProfileMenu}>
                      Profile Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/add-asset" onClick={closeProfileMenu}>
                      Add Asset
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/all-requests" onClick={closeProfileMenu}>
                      View All Requests
                    </NavLink>
                  </li>

                  <div className="divider my-2"></div>

                  {/* Logout Button */}
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="btn btn-secondary btn-sm w-full flex items-center gap-2"
                    >
                      <IoMdLogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
