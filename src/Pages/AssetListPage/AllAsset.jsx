import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllAsset = () => {
  const {
    data: assets = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/assets");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load assets</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Assets</h2>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Type</th>
              <th>Total Qty</th>
              <th>Available</th>
              <th>Added By</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td>{index + 1}</td>

                <td className="flex items-center gap-3">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <span>{item.productName}</span>
                </td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      item.productType === "Returnable"
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {item.productType}
                  </span>
                </td>

                <td>{item.productQuantity}</td>
                <td>{item.availableQuantity}</td>
                <td>{item.hrEmail}</td>
                <td>{new Date(item.dateAdded).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAsset;
