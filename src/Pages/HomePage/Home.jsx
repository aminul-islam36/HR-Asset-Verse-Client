import React from "react";
import Hero from "../../Components/Hero/Hero";
import About from "../../Components/AboutSection/About";
import Packages from "../../Components/Packages";
import TestimonialsSection from "../../Components/Testimonials";
import FAQSection from "../../Components/FAQSection";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto py-10 px-5">
      <Hero />
      <About />
      <Packages />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default Home;
