import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import PageLoader from "../Components/PageLoader";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RootLayout = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const { isLoading } = useAuth();
  const { roleLoading } = useRole();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (isLoading || roleLoading) {
    return <PageLoader />;
  }

  const ThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <Header />
      <Outlet />
      <Footer />
      <button
        onClick={ThemeToggle}
        className="fixed bottom-6 right-6 btn btn-accent rounded-full text-white z-10"
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
};

export default RootLayout;
