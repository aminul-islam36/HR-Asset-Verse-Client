import React from "react";
import Logo from "../../Components/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <Logo />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
