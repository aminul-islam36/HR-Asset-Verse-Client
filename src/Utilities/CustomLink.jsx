import React from "react";
import { NavLink } from "react-router";

const CustomLink = ({ link }) => {
  return (
    <NavLink
      to={link.href}
      className={({ isActive }) =>
        `py-2.5 px-4.5 rounded ml-2 transition
     ${isActive ? "bg-primary text-white" : "text-neutral"}`
      }
    >
      {link.name}
    </NavLink>
  );
};

export default CustomLink;
