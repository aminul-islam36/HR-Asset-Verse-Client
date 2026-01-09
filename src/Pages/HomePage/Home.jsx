import About from "../../Components/About";
import Packages from "../../Components/Packages";
import TestimonialsSection from "../../Components/Testimonials";
import FAQSection from "../../Components/FAQSection";
import Hero from "../../Components/Hero";
import useRole from "../../hooks/useRole";

const Home = () => {
  const { role } = useRole();

  return (
    <div className="bg-base-200">
      <Hero />
      <About />
      {role === "Hr" && <Packages />}
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default Home;
