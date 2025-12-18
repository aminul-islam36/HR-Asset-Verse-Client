import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import PageLoader from "../Components/PageLoader";
import useAuth from "../hooks/useAuth";
// import useRole from "../hooks/useRole";

const RootLayout = () => {
  const { isLoading } = useAuth();
  // const { roleLoading } = useRole();
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
