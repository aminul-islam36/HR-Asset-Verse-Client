import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import Title from "../../Utilities/Title";

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
    <div className="mx-auto max-w-7xl w-11/12 py-10">
      <Title title={`Total Assets Request ${requests.length}`} />

      <div className="overflow-x-auto pt-5">
        <table className="table w-full border overflow-hidden x-auto">
          <thead>
            <tr className="bg-gray-200">
              <th>Asset Name</th>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-end lg:pr-20">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.assetName}</td>
                <td>{req.requesterName}</td>
                <td>{new Date(req.requestDate).toLocaleString()}</td>
                <td className="capitalize">{req.requestStatus}</td>
                <td>
                  {req.requestStatus === "pending" ? (
                    <div className="flex gap-2 justify-end">
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
