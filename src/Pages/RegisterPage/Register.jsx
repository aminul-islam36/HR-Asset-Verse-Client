import { useState } from "react";

import HrAdminRegisterForm from "../../Components/HrAdminRegisterForm";
import EmployeeForm from "../../Components/EmployeeForm";
import { Link } from "react-router";

const Register = () => {
  const [tab, setTab] = useState("employee");
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex-col">
        <div className="card bg-base-100 w-full max-w-lg shadow-xl">
          <div className="card-body">
            <h2 className="text-4xl font-bold text-center">Create Account</h2>
            <p className="text-sm mb-4 text-center">Choose your account type</p>

            {/* Tabs */}
            <div role="tablist" className="tabs">
              <button
                role="tab"
                className={`tab ${tab === "hr" ? "tab-active" : ""}`}
                onClick={() => setTab("hr")}
              >
                HR Manager
              </button>

              <button
                role="tab"
                className={`tab ${tab === "employee" ? "tab-active" : ""}`}
                onClick={() => setTab("employee")}
              >
                Employee
              </button>
            </div>

            {/* Register and Emplyee Forms */}
            <div className="mt-4">
              {tab === "hr" ? <HrAdminRegisterForm /> : <EmployeeForm />}
            </div>

            <p className="mt-4 text-center">
              Already have an account?
              <Link to="/auth/login" className="text-blue-700">
                Click here to sign in.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
