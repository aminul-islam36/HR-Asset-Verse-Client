import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import Logo from "./Logo";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { IoMdMenu } from "react-icons/io";

const Header = () => {
  const { user, logOutUser, isLoading: loading } = useAuth();
  const axiosURL = useAxios();

  // Get role from server

  const { data: userRole = [], isLoading } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await axiosURL.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Public links
  const publicLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/testimonial">Testimonial</NavLink>
      </li>
      <li>
        <NavLink to="/upgrade-Package"> Packages</NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink to="/join-employee">Join as Employee</NavLink>
          </li>
          <li>
            <NavLink to="/join-hr">Join as HR Manager</NavLink>
          </li>
        </>
      )}
    </>
  );

  // Employee dropdown
  const employeeMenu = (
    <>
      <li>
        <NavLink to="/my-assets">My Assets</NavLink>
      </li>

      <li>
        <NavLink to="/request-asset">Request Asset</NavLink>
      </li>
      <li>
        <NavLink to="/my-team">My Team</NavLink>
      </li>
      <li>
        <NavLink to="/employeeProfile">Profile</NavLink>
      </li>
    </>
  );

  // HR Manager dropdown
  const hrMenu = (
    <>
      <li>
        <NavLink to="/add-asset">Add Asset</NavLink>
      </li>
      <li>
        <NavLink to="/asset-list">Asset List</NavLink>
      </li>
      <li>
        <NavLink to="/all-requests">All Requests</NavLink>
      </li>
      <li>
        <NavLink to="/employee-list">My Employee List</NavLink>
      </li>
      <li>
        <NavLink to="/upgrade-Package">Upgrade Package</NavLink>
      </li>
      <li>
        <NavLink to="/hrProfile">Profile</NavLink>
      </li>
    </>
  );
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

  // if (isLoading || loading) {
  //   return <p>Loading....</p>;
  // }
  return (
    <div className="shadow-sm sticky top-2 z-100">
      <div className="navbar bg-base-100 w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <IoMdMenu />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {userRole.role === "employee" && employeeMenu}
              {userRole.role === "Hr" && hrMenu}
              <li>
                <button onClick={handleLogOut} className="btn btn-secondary">
                  Log Out
                </button>
              </li>
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{publicLinks}</ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
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
                  {userRole.role === "employee" && employeeMenu}
                  {userRole.role === "Hr" && hrMenu}
                  <div className="divider my-2"></div>
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
