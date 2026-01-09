import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Container from "./Container";

const Packages = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const handlePayment = async (pkg) => {
    const paymentInfo = {
      price: pkg.price,
      subscription: pkg.subscription,
      hrEmail: user?.email,
    };
    console.log(paymentInfo);

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };
  return (
    <Container>
      <div className="grid md:grid-cols-3 gap-6 py-8">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="card bg-base-100 hover:shadow-lg transition justify-end border cursor-pointer border-gray-200"
          >
            <div className="card-body flex-0">
              <h2 className="card-title text-3xl font-bold">
                {pkg.subscription}
              </h2>
              <p className="text-gray-600">
                Employee Limit:{" "}
                <span className="font-semibold">{pkg.employeeLimit}</span>
              </p>
              <p className="text-4xl font-bold mt-3">
                ${pkg.price}
                <span className="text-sm text-gray-400 font-normal">
                  /month
                </span>
              </p>

              <ul className="mt-4 space-y-2">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="checkbox checkbox-sm"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="card-actions mt-5">
                <button
                  onClick={() => handlePayment(pkg)}
                  className="btn btn-secondary w-full"
                >
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Packages;
