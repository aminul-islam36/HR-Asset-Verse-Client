import React from "react";
import { NavLink } from "react-router";

const CustomLink = ({ link }) => {
  return (
    <NavLink
      to={link.href}
      className={({ isActive }) =>
        `py-2.5 px-4 text-base rounded hover:text-accent/70 font-semibold
     ${isActive ? "text-primary" : "text-neutral"}`
      }
    >
      {link.name}
    </NavLink>
  );
};

export default CustomLink;
