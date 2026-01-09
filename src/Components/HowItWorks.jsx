import {
  FaUserPlus,
  FaBoxOpen,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";
import Title from "../Utilities/Title";
import SubTitle from "../Utilities/SubTitle";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl text-primary" />,
      title: "Create Account",
      desc: "HR and employees create accounts to access the asset management system securely.",
    },
    {
      icon: <FaBoxOpen className="text-4xl text-primary" />,
      title: "Add & Manage Assets",
      desc: "HR adds company assets, sets quantity, and manages availability easily.",
    },
    {
      icon: <FaCheckCircle className="text-4xl text-primary" />,
      title: "Request & Approve",
      desc: "Employees request assets and HR approves them based on package limits.",
    },
    {
      icon: <FaChartLine className="text-4xl text-primary" />,
      title: "Track & Monitor",
      desc: "Track assigned assets, usage history, and employee asset records in real-time.",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center">
          <Title normal={"How It Works"} />
          <SubTitle>
            {" "}
            Simple steps to manage company assets efficiently and transparently.
          </SubTitle>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-md hover:shadow-xl transition"
            >
              <div className="card-body text-center">
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
