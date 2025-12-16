import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AllAsset = () => {
  const axiosURL = useAxios();
  const { user } = useAuth();
  const modalRef = useRef();
  const { register, handleSubmit } = useForm();
  const {
    data: assets = [],
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosURL.get(`/assets?hrEmail=${user.email}`);
      return res.data;
    },
  });

  const handleDeleteAsset = async (asset) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Asset will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosURL.delete(`/assets/${asset._id}`);

        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Request removed successfully", "success");
          refetch();
        }
      }
    });
  };
  const handleEditAsset = (asset) => {
    modalRef.current.showModal();
  };

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
              <th>Total & Available Qty</th>
              <th>Added Date</th>
              <th className="text-center"> Actions</th>
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

                <td>
                  {item.productQuantity} - {item.availableQuantity}
                </td>
                <td>{new Date(item.dateAdded).toLocaleDateString()}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleDeleteAsset(item._id)}
                    className="btn"
                  >
                    <MdAutoDelete />
                  </button>
                  <button
                    className="btn ml-2"
                    onClick={() => handleEditAsset(item._id)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --------- Modal For Editing Asset ------------ */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Update Your Asset
          </h2>
          <form className="space-y-4">
            {/* Asset Name */}
            <div>
              <label className="label">Asset Name</label>
              <input
                {...register("assetName", { required: true })}
                type="text"
                placeholder="Laptop, Chair, Monitor..."
                className="input w-full"
              />
            </div>

            {/* Asset Logo Image  */}

            <div>
              <label className="label">Product Image</label>
              <input
                {...register("file")}
                type="file"
                className="file-input w-full"
              />
            </div>
            {/* Type */}
            <div>
              <label className="label">Asset Type</label>
              <select
                {...register("assetType", { required: true })}
                className="select w-full"
              >
                <option disabled>Select Type</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="label">Quantity</label>
              <input
                {...register("quantity", { required: true })}
                type="number"
                min="1"
                className="input w-full"
                placeholder="Quantity..."
              />
            </div>
            {/* Submit Button */}
            <button className="btn btn-secondary w-full mt-2">
              Update Now
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllAsset;
