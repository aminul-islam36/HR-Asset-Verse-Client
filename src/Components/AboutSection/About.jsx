import { Briefcase, Clock, ShieldCheck, Users } from "lucide-react";
import React from "react";

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
    <div className="py-20 bg-white">
      <div className="px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-primary">AssetVerse?</span>
          </h2>
          <p className="text-gray-600 mt-3">
            Efficient, secure and modern tools to help you manage your company
            assets.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
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
    </div>
  );
};

export default About;
