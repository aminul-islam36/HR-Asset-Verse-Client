import React from "react";
import Header from "../../Components/Header/Header";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer/Footer";

const Root = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <Header />
      <main className="w-11/12 mx-auto ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
