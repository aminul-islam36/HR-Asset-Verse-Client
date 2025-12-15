import React from "react";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const Packages = () => {
  const axiosURL = useAxios();

  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosURL.get("/packages");
      return res.data;
    },
  });
  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {packages.map((pkg) => (
        <div
          key={pkg.name}
          className="card bg-base-100 hover:shadow-lg transition justify-end border cursor-pointer border-gray-200"
        >
          <div className="card-body flex-0">
            <h2 className="card-title text-3xl font-bold">{pkg.name}</h2>
            <p className="text-gray-600">
              Employee Limit:{" "}
              <span className="font-semibold">{pkg.employeeLimit}</span>
            </p>

            <p className="text-4xl font-bold mt-3">
              ${pkg.price}
              <span className="text-sm text-gray-400 font-normal">/month</span>
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
              <button className="btn btn-neutral w-full">Choose Plan</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Packages;
