import About from "../../Components/About";
import Packages from "../../Components/Packages";
import TestimonialsSection from "../../Components/Testimonials";
import FAQSection from "../../Components/FAQSection";
import Hero from "../../Components/Hero";
import useRole from "../../hooks/useRole";

const Home = () => {
  const { role } = useRole();

  return (
    <div>
      <div>
        <Hero />
      </div>
      <div>
        <About />
      </div>
      <div>{role === "Hr" && <Packages />}</div>
      <div>
        <TestimonialsSection />
      </div>

      <div>
        <FAQSection />
      </div>
    </div>
  );
};

export default Home;
