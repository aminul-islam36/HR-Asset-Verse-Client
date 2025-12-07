import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Logo from "../Logo";
import Button from "../Button";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const [role, setRole] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`http://localhost:5000/users/${user?.email}`)
      .then((res) => {
        setRole(res.data.role);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const links = (
    <>
      {/* Public Links  */}
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      {/* HR ADMIN LINKS  */}
      {role === "Hr" && (
        <>
          <li>
            <NavLink to="/upgrade-Package">Upgrade Package</NavLink>
          </li>
          <li>
            <NavLink to="/all-Requests">All Requests</NavLink>
          </li>
          <li>
            <NavLink to="/my-employee-List">My Employee List</NavLink>
          </li>
          <li>
            <NavLink to="/asset-List">All Asset List</NavLink>
          </li>
          <li>
            <NavLink to="/add-Asset">Add Asset</NavLink>
          </li>
        </>
      )}

      {/* Employee Links  */}

      {role === "employee" && (
        <>
          <li>
            <NavLink to="/my-Team">My Team</NavLink>
          </li>
          <li>
            <NavLink to="/request-Asset">Request an Asset </NavLink>
          </li>
          <li>
            <NavLink to="/my-asset">My Assets</NavLink>
          </li>
          <li>
            <NavLink to="/employee-Profile">Employee Profile</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="shadow-sm ">
      <div className="navbar bg-base-100 w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Header;
