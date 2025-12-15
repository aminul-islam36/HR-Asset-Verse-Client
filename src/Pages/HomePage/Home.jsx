import React from "react";
import Hero from "../../Components/Hero/Hero";
import About from "../../Components/AboutSection/About";
import Packages from "../../Components/Packages";
import TestimonialsSection from "../../Components/Testimonials";
import FAQSection from "../../Components/FAQSection";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const Home = () => {
  const { user } = useAuth();
  const axiosURL = useAxios();
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosURL.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className=" py-10 px-5">
      <Hero />
      <About />
      {userInfo.role === "Hr" && <Packages />}
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default Home;
