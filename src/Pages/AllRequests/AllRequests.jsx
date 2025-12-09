import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const AllRequests = () => {
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requestAsset"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/requestAsset");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading Requests...</p>;

  // Reject Request (Delete API)
  const handleReject = async (req) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `http://localhost:5000/requestAsset/${req._id}`
        );

        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Request removed successfully", "success");
          refetch();
        }
      }
    });
  };

  const handleApprove = async (req) => {
    const assignedData = {
      assetId: req.assetId,
      assetName: req.assetName,
      requesterEmail: req.requesterEmail,
      requestedQuantity: req.requestedQuantity,
    };

    const res = await axios.post(
      `http://localhost:5000/approveRequest/${req._id}`,
      assignedData
    );
    if (res.data.success) {
      Swal.fire("Approved!", "Request approved successfully", "success");
      refetch();
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-5">Manage Asset Requests</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Asset Name</th>
              <th>Requester</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.assetName}</td>
                <td>{req.requesterEmail}</td>
                <td>{req.requestedQuantity}</td>
                <td className="capitalize">{req.requestStatus}</td>
                <td>{req.note || "—"}</td>

                <td>
                  {req.requestStatus === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(req)}
                        className="btn btn-success btn-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(req)}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
