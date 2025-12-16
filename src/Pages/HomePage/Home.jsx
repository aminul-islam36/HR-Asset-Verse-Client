import React from "react";
import Hero from "../../Components/Hero/Hero";
import About from "../../Components/AboutSection/About";
import Packages from "../../Components/Packages";
import TestimonialsSection from "../../Components/Testimonials";
import FAQSection from "../../Components/FAQSection";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { motion } from "framer-motion";

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

  const item = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className=" py-10 px-5">
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        roduct
      >
        <Hero />
      </motion.div>
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        roduct
      >
        <About />
      </motion.div>
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        roduct
      >
        {userInfo.role === "Hr" && <Packages />}
      </motion.div>
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.7 }}
        roduct
      >
        <TestimonialsSection />
      </motion.div>
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.7 }}
        roduct
      >
        <FAQSection />
      </motion.div>
    </div>
  );
};

export default Home;
