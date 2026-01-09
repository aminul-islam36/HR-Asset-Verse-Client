import { Briefcase, Clock, ShieldCheck, Users } from "lucide-react";
import React from "react";
import Container from "./Container";
import Title from "../Utilities/Title";

const About = () => {
  const benefits = [
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "Smart Asset Management",
      desc: "Track all company assets in real-time and reduce asset loss.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Secure & Reliable",
      desc: "Your company data is encrypted and safely stored on the cloud.",
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "Save Time & Money",
      desc: "Automated workflows that speed up the entire asset management process.",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Employee Friendly",
      desc: "Easy request system for employees to ask assets with one click.",
    },
  ];

  return (
    <Container>
      <div className="p-5 rounded-2xl">
        <div className="text-center mb-12">
          <Title normal={" Why Choose"} color={"AssetVerse ?"} />
          <p className="text-gray-600 mt-3">
            Efficient, secure and modern tools to help you manage your company
            assets.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-secondary text-white p-6 rounded-xl shadow hover:shadow-md transition text-center space-y-4"
            >
              <div className="flex justify-center text-white">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default About;
