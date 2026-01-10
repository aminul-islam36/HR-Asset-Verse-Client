import React from "react";
import { NavLink } from "react-router";

const CustomLink = ({ link }) => {
  return (
    <NavLink
      to={link.href}
      className={({ isActive }) =>
        `py-2.5 px-3 text-base rounded hover:text-accent/70 font-semibold arimo
     ${isActive ? "text-accent" : "text-neutral"}`
      }
    >
      {link.label}
    </NavLink>
  );
};

export default CustomLink;
