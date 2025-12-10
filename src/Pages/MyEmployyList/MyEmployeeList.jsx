import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const MyEmployeeList = () => {
  const axiosURL = useAxios();

  const {
    data: Myemployees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employeeList"],
    queryFn: async () => {
      const res = await axiosURL.get("/myEmployeeList");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error fetching data!</p>
    );

  return (
    <div className="w-11/12 mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My All Employees</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {Myemployees.map((emp) => (
          <div
            key={emp._id}
            className="card shadow-sm border border-gray-200 bg-base-100 "
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <img
                  src={emp.companyLogo}
                  alt={emp.companyName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{emp.employeeName}</h3>
                  <p className="text-gray-500">{emp.employeeEmail}</p>
                  <p className="text-gray-500">{emp.companyName}</p>
                </div>
              </div>

              <p className="mt-4 text-gray-600">
                Affiliation Date:{" "}
                {new Date(emp.affiliationDate).toLocaleDateString()}
              </p>
              <p className="mt-1">
                Status:
                <span
                  className={`font-semibold ${
                    emp.status === "active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {emp.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEmployeeList;
