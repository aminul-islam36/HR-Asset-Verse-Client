import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import Logo from "./Logo";
import Swal from "sweetalert2";
import { IoMdMenu, IoMdClose, IoMdPerson, IoMdLogOut } from "react-icons/io";
import { useState } from "react";
import useRole from "../hooks/useRole";
import CustomLink from "../Utilities/CustomLink";

const Header = () => {
  const { user, logOutUser, isLoading } = useAuth();
  const { role, roleLoading } = useRole();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Public links - Show when not logged in
  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "Join as Employee", href: "/register" },
    { label: "Join HR Manager", href: "/join-hr" },
  ];

  // Employee menu - Only for employees
  const employeeMenu = [
    { label: "My Assets", href: "/my-assets" },
    { label: "Request Asset", href: "/request-asset" },
    { label: "My Team", href: "/my-team" },
    { label: "Profile", href: "/employeeProfile" },
  ];

  // HR menu - Only for HR
  const hrMenu = [
    { label: "Add Asset", href: "/add-asset" },
    { label: "Asset List", href: "/asset-list" },
    { label: "All Requests", href: "/all-requests" },
    { label: "Employee List", href: "/employee-list" },
    { label: "Package", href: "/packages" },
  ];

  // Dashboard menu items for HR users
  const dashboardMenu = [
    { label: "Dashboard", href: "/dashboard" },
    // { label: "Asset Requests", href: "/dashboard/asset-requests" },
    // { label: "Approvals", href: "/dashboard/approvals" },
    { label: "Profile", href: "/dashboard/profile" },
  ];

  const handleLogOut = async () => {
    try {
      await logOutUser();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Logout failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Get center navigation menu based on user role
  const getCenterNavMenu = () => {
    if (!user) {
      // Show public links when not logged in
      return publicLinks;
    }

    // When logged in, show role-specific items only
    if (role === "employee") {
      return employeeMenu;
    } else if (role === "Hr" || role === "hr") {
      return hrMenu;
    }

    // Fallback - show public links if role is not determined yet
    return publicLinks;
  };

  const centerNavMenu = getCenterNavMenu();

  if (isLoading || roleLoading) {
    return (
      <header className="sticky top-0 z-50 bg-base-300 shadow-lg border-b border-base-200">
        <div className="navbar h-16 max-w-7xl mx-auto px-4 lg:px-6">
          <div className="navbar-start">
            <Logo />
          </div>
          <div className="navbar-center">
            <span className="text-neutral">Loading...</span>
          </div>
          <div className="navbar-end">
            <div className="loading loading-spinner loading-sm"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-base-300 shadow-lg border-b border-base-200">
      <div className="navbar h-16 max-w-7xl mx-auto px-4 lg:px-6">
        {/* Left side - Mobile menu button + Logo */}
        <div className="navbar-start">
          <button
            onClick={toggleMobileMenu}
            className="btn btn-ghost btn-square lg:hidden text-base-content hover:bg-base-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <IoMdClose className="h-6 w-6" />
            ) : (
              <IoMdMenu className="h-6 w-6" />
            )}
          </button>
          <Logo />
        </div>

        {/* Center - Main Navigation (Always visible on desktop) */}
        <div className="navbar-center hidden lg:flex">
          <nav>
            <ul className="menu menu-horizontal px-1 gap-2">
              {centerNavMenu.map((link) => (
                <li key={link.href}>
                  <CustomLink link={link} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right side - Login button or User profile */}
        <div className="navbar-end">
          {!user ? (
            <NavLink
              to="/login"
              className="custom-button"
              aria-label="Login to your account"
            >
              Login
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition-colors"
                aria-label="User profile menu"
              >
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-300">
                  <img
                    src={
                      user.photoURL || "https://i.ibb.co.com/bMr460hd/ss.avif"
                    }
                    alt="User profile"
                    className="rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Desktop Profile Dropdown */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-64 p-3 shadow border border-gray-200 text-base-content"
              >
                {/* User Info Header */}
                <span className="menu-title text-neutral font-semibold mb-2 px-3">
                  <div className="flex items-center gap-2">
                    <IoMdPerson className="h-4 w-4" />
                    <span className="truncate">
                      {user.displayName || user.email || "User"}
                    </span>
                  </div>
                </span>
                <div className="divider my-1"></div>

                {/* Dashboard Section - Only for HR users */}
                {user && (role === "Hr" || role === "hr") && (
                  <>
                    {dashboardMenu.map((item) => (
                      <li key={item.href}>
                        <CustomLink link={item} />
                      </li>
                    ))}
                    <div className="divider my-2"></div>
                  </>
                )}
                {/* Logout Button */}
                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-warning btn-sm w-full flex items-center gap-2"
                  >
                    <IoMdLogOut className="h-4 w-4" />
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-base-100 border-t border-base-200 shadow-lg">
          <div className="px-4 py-4 max-w-7xl mx-auto">
            {/* Mobile User Info - Only show if user is logged in */}
            {/* {user && (
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-base-200">
                <div className="avatar">
                  <div className="w-12 rounded-full ring-2 ring-primary">
                    <img
                      src={
                        user.photoURL || "https://i.ibb.co.com/bMr460hd/ss.avif"
                      }
                      alt="User profile"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral truncate">
                    {user.displayName || user.email || "User"}
                  </p>
                  <p className="text-sm text-secondary capitalize">
                    {role || "Loading..."}
                  </p>
                </div>
              </div>
            )} */}

            {/* Mobile Navigation Links */}
            <nav>
              <ul className="menu menu-sm gap-1">
                {centerNavMenu.map((item) => (
                  <li key={item.href}>
                    <div onClick={closeMobileMenu}>
                      <CustomLink link={item} />
                    </div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Dashboard Section - Only for HR users */}
            {/* {user && (role === "Hr" || role === "hr") && (
              <>
                <div className="divider my-4"></div>
                <h3 className="font-semibold text-neutral mb-3">Dashboard</h3>
                <nav>
                  <ul className="menu menu-sm gap-1">
                    {dashboardMenu.map((item) => (
                      <li key={item.href}>
                        <div onClick={closeMobileMenu}>
                          <CustomLink link={item} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            )} */}

            {/* Mobile Logout Button - Only show if user is logged in */}
            {/* {user && (
              <div className="mt-4 pt-4 border-t border-base-200">
                <button
                  onClick={handleLogOut}
                  className="btn btn-secondary btn-sm w-full flex items-center justify-center gap-2"
                >
                  <IoMdLogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            )} */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
