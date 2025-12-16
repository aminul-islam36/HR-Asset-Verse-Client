import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const AllRequests = () => {
  const axiosURL = useAxios();
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requestAsset"],
    queryFn: async () => {
      const res = await axiosURL.get("/requestAsset");
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
        const res = await axiosURL.delete(`/requestAsset/${req._id}`);

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
      assetImage: req.assetImage,
      assetType: req.assetType,
      employeeEmail: req.requesterEmail,
      employeeName: req.requesterName,
      hrEmail: req.hrEmail,
      companyName: req.companyName,
    };

    const res = await axiosURL.post(`/approveRequest/${req._id}`, assignedData);
    if (res.data.needUpgrade) {
      Swal.fire({
        icon: "error",
        title: "Package Limit Finished!",
        text: "Please upgrade your subscription plan to approve more employees.",
      });
      return;
    }
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
