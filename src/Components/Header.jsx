import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import Logo from "./Logo";
import Swal from "sweetalert2";
import { IoMdMenu } from "react-icons/io";
import useRole from "../hooks/useRole";
import CustomLink from "../Utilities/CustomLink";

const Header = () => {
  const { user, logOutUser } = useAuth();
  const { role } = useRole();
  console.log(role);

  // Public links
  const links = [
    { name: "Home", href: "/" },
    { name: "Join as Employee", href: "/register" },
    {
      name: "Join HR Manager",
      href: "/join-hr",
    },
  ];

  // Employee dropdown
  const employee = [
    { name: "My Assets", href: "/my-assets" },
    { name: "Request Asset", href: "/request-asset" },
    { name: "My Team", href: "/my-team" },
    { name: "Profile", href: "/employeeProfile" },
  ];

  const hrMenu = [
    { name: "Add Asset", href: "/add-asset" },
    { name: "Asset List", href: "/asset-list" },
    { name: "All Requests", href: "/all-requests" },
    { name: "My Employee List", href: "/employee-list" },
    { name: "Upgrade Package", href: "/upgrade-Package" },
    { name: "Profile", href: "/profile" },
  ];
  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log Out successfull",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="shadow-sm sticky top-0 z-100 py-1">
      <div className="navbar w-11/12 max-w-7xl mx-auto">
        <div className="navbar-start">
          {user && role && (
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <IoMdMenu />
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {role === "employee" &&
                  employee.map((e) => (
                    <CustomLink key={e.href} link={e}></CustomLink>
                  ))}
                {role === "Hr" &&
                  hrMenu.map((e) => (
                    <CustomLink key={e.href} link={e}></CustomLink>
                  ))}
                <li>
                  <button onClick={handleLogOut} className="btn btn-secondary">
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {!user &&
              links.map((link) => (
                <CustomLink key={link.href} link={link}></CustomLink>
              ))}
          </ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <NavLink to="/login" className="custom-button">
              Login
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn select-secondary btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/219/219983.png"
                    }
                    alt="profile"
                  />
                </div>
              </div>
              <div className="hidden lg:block">
                {" "}
                <ul
                  tabIndex={0}
                  className="  menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow "
                >
                  {role === "employee" &&
                    employee.map((e) => (
                      <CustomLink key={e.href} link={e}></CustomLink>
                    ))}
                  {role === "Hr" &&
                    hrMenu.map((e) => (
                      <CustomLink key={e.href} link={e}></CustomLink>
                    ))}
                  <div className="divider my-3"></div>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="btn btn-secondary"
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
