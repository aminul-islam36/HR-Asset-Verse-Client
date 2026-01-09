import {
  FaUsers,
  FaBoxOpen,
  FaChartLine,
  FaUserShield,
  FaBell,
  FaCloud,
} from "react-icons/fa";
import Container from "./Container";
import Title from "../Utilities/Title";
import SubTitle from "../Utilities/SubTitle";

const Features = () => {
  const features = [
    {
      icon: <FaUsers />,
      title: "Employee Management",
      desc: "Manage employees, roles, and company affiliations from a single dashboard.",
    },
    {
      icon: <FaBoxOpen />,
      title: "Asset Tracking",
      desc: "Track company assets, availability, assignments, and returns in real time.",
    },
    {
      icon: <FaChartLine />,
      title: "Smart Analytics",
      desc: "View usage statistics, asset distribution, and employee insights.",
    },
    {
      icon: <FaUserShield />,
      title: "Role-Based Access",
      desc: "Secure access for Admin, HR, and Employees with permission control.",
    },
    {
      icon: <FaBell />,
      title: "Request & Approval System",
      desc: "Employees request assets, HR approves with package limit validation.",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Based & Secure",
      desc: "Firebase authentication and MongoDB ensure data safety and scalability.",
    },
  ];

  return (
    <Container>
      {" "}
      <div className="text-center">
        <Title normal={"Powerful"} color={"Features"} />
        <SubTitle>
          Everything you need to manage assets, employees, and approvals — all
          in one modern platform.
        </SubTitle>
      </div>
      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card bg-base-100 hover:shadow border border-gray-200/30 transition"
          >
            <div className="card-body items-center text-center">
              <div className="text-4xl text-primary mb-4">{feature.icon}</div>
              <h3 className="card-title text-xl font-semibold">
                {feature.title}
              </h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Features;
