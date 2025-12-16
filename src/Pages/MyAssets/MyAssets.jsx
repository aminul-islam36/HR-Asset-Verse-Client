import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

const MyAssets = () => {
  const axiosURL = useAxios();
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const limit = 10;
  const skip = page * limit;

  const { data } = useQuery({
    queryKey: ["AssignedAssets", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosURL.get(
        `/assignedAssets?employeeEmail=${user.email}&limit=${limit}&skip=${skip}`
      );
      return res.data;
    },
  });
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mx-auto w-11/12 py-6">
      <div className="lg:flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Total Assigned Assets {data?.total}
        </h2>
        <label className="input">
          <input type="search" required placeholder="Search" />
        </label>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Approved By</th>
              <th>Company Name</th>
              <th>Assigned Date</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {data?.result?.map((item, index) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="hover:bg-gray-50"
              >
                <td>{index + 1}</td>

                <td className="flex items-center gap-3">
                  <img
                    src={item.assetImage}
                    alt={item.assetName}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <span>{item.assetName}</span>
                </td>

                <td>{item.processedBy}</td>
                <td>{item.companyName}</td>
                <td>{new Date(item.assignmentDate).toLocaleDateString()}</td>
                <td>
                  {" "}
                  {item.assetType === "Returnable" ? (
                    <button className="btn btn-secondary">Return Asset</button>
                  ) : (
                    <button className="btn btn-secondary btn-disabled">
                      Non Return
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-5 space-x-2">
        <button
          className="btn"
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`btn ${page === i ? "btn-secondary" : ""}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn"
          disabled={page + 1 === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyAssets;
