import About from "../../Components/About";
import Packages from "../../Components/Packages";
import TestimonialsSection from "../../Components/Testimonials";
import FAQSection from "../../Components/FAQSection";
import Hero from "../../Components/Hero";
import useRole from "../../hooks/useRole";
import Features from "../../Components/Features";
import CallToAction from "../../Components/CallToAction";
import HowItWorks from "../../Components/HowItWorks";

const Home = () => {
  const { role } = useRole();

  return (
    <div className="bg-base-200">
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      {role === "hr" && <Packages />}
      <TestimonialsSection />
      <FAQSection />
      <CallToAction />
    </div>
  );
};

export default Home;
