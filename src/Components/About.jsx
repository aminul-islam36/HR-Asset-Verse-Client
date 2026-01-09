import { Briefcase, Clock, ShieldCheck, Users } from "lucide-react";
import React from "react";
import Container from "./Container";
import Title from "../Utilities/Title";
import SubTitle from "../Utilities/SubTitle";

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
      <div className="rounded-2xl">
        <div className="text-center">
          <Title normal={" Why Choose"} color={"AssetVerse ?"} />
          <SubTitle>
            Efficient, secure and modern tools to help you manage your company
          </SubTitle>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-base-200 text-base-content p-6 rounded-xl shadow:sm hover:shadow transition text-center border border-gray-200 space-y-4"
            >
              <div className="flex justify-center text-success">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default About;
