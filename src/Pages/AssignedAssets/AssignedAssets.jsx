import React from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const AssignedAssets = () => {
  const axiosURL = useAxios();
  const { data: AssignedAssets = [] } = useQuery({
    queryKey: ["AssignedAssets"],
    queryFn: async () => {
      const res = await axiosURL.get("/AssignedAssets");
      return res.data;
    },
  });
  return (
    <div className="mx-auto w-11/12 py-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        All Assigned Assets
      </h2>
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
            {AssignedAssets.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
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
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      item.assetType === "Returnable"
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {item.assetType}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedAssets;
