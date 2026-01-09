import { Star, Building2, Users, ShieldCheck } from "lucide-react";
import Container from "./Container";
import Title from "../Utilities/Title";
import SubTitle from "../Utilities/SubTitle";

const TestimonialsSection = () => {
  const states = [
    {
      icon: <Building2 />,
      state: "100+",
      name: "Companies Served",
    },
    {
      icon: <Users />,
      state: "5000+",
      name: "Active Employees",
    },
    {
      icon: <ShieldCheck />,
      state: "99.9%",
      name: "System Uptime",
    },
    {
      icon: <Star />,
      state: "4.9/5",
      name: "Customer Rating",
    },
  ];
  return (
    <Container>
      <div className="text-center">
        <Title normal={"Trusted by "} color={"Top Companies"} />
        <SubTitle>
          More than 100+ businesses rely on AssetVerse for asset management.
        </SubTitle>
      </div>
      {/*---------- Stats ---------*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-center">
        {states.map((stat) => (
          <div className="  p-6 bg-base-100 rounded-2xl border border-gray-200">
            <span className="mx-auto text-secondary *:w-10 *:h-10 inline-block">
              {stat.icon}
            </span>
            <h3 className="text-3xl font-bold text-base-content mt-2">
              {stat.state}
            </h3>
            <p className="text-base text-gray-500">{stat.name}</p>
          </div>
        ))}
      </div>
      {/* ----------------Testimonials------------------- */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 bg-base-100 rounded-2xl shadow border border-gray-200 *:text-base text-gray-500">
          <p className="italic">
            “AssetVerse completely transformed how we manage company assets.
            It's fast, reliable, and extremely easy to use.”
          </p>
          <h4 className="mt-4 font-semibold">— Sarah Johnson, HR Manager</h4>
        </div>

        <div className="p-8 bg-base-100 rounded-2xl shadow border border-gray-200 *:text-base text-gray-500">
          <p className="italic">
            “Tracking assets for 200+ employees used to be a nightmare, but
            AssetVerse made everything automated and stress-free.”
          </p>
          <h4 className="mt-4 font-semibold">— Mark Wilson, Operations Head</h4>
        </div>

        <div className="p-8 bg-base-100 rounded-2xl shadow border border-gray-200 text-gray-500">
          <p className="italic">
            “Excellent support team! Their Premium plan gave us full control and
            custom branding. Highly recommended!”
          </p>
          <h4 className="mt-4 font-semibold">— Daniel Gomez, CEO</h4>
        </div>
      </div>
    </Container>
  );
};

export default TestimonialsSection;
