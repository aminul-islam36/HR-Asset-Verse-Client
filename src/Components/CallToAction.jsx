import React from "react";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Manage Your Company Assets Smarter?
        </h2>

        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
          Track assets, manage employees, approve requests, and control usage —
          all from one powerful dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <button className="btn btn-accent btn-lg">Get Started Free</button>
          </Link>

          <Link to="/packages">
            <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              View Packages
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
