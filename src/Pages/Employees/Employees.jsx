import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useaxiosPublic from "../../hooks/useAxiosPublic";

const Employees = () => {
  const { user } = useAuth();
  const axiosURL = useaxiosPublic();

  const {
    data: Myemployees = [],
    isError,
    refetch,
  } = useQuery({
    queryKey: ["employeeList", user.email],
    enabled: !!user.email,
    queryFn: async () => {
      const res = await axiosURL.get(`/employees?hrEmail=${user?.email}`);
      return res.data;
    },
  });

  const handleDeleteEmployee = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosURL.delete(`/employees/${id}?hrEmail=${user?.email}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  // if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error fetching data!</p>
    );

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">
        My All Employees <span className="text-xl">({Myemployees.length})</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {Myemployees.map((emp) => (
          <div
            key={emp._id}
            className="card shadow-sm border border-gray-200 bg-base-100 "
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <img
                  src={
                    emp.employeePhoto ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                  }
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
              <div className="flex justify-between">
                <p>Assets Count: {emp.assetsCount}</p>
                <button
                  onClick={() => handleDeleteEmployee(emp._id)}
                  className="btn btn-warning text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
