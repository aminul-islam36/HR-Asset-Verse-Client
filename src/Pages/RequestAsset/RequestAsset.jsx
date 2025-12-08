import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const RequestAsset = () => {
  const { user } = useAuth();

  const { register, handleSubmit } = useForm();

  // Load all assets
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/assets");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading assets...</p>;
  // Handle form submit
  const handleAssetRequst = async (data) => {
    const selectedAsset = assets.find((a) => a._id === data.assetId);

    if (!selectedAsset) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Selection",
      });
    }

    const requestedQty = Number(data.quantity);

    if (requestedQty < 1) {
      return Swal.fire({
        icon: "error",
        title: "Quantity should be at least 1",
      });
    }

    if (requestedQty > selectedAsset.availableQuantity) {
      return Swal.fire({
        icon: "error",
        title: "Not enough stock available",
      });
    }

    //  request data
    const requestAssetData = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.productName,
      assetType: selectedAsset.productType,

      requesterName: user?.displayName,
      requesterEmail: user?.email,

      hrEmail: selectedAsset.hrEmail,
      companyName: selectedAsset.companyName,

      requestDate: new Date(),
      approvalDate: null,
      requestStatus: "pending",

      note: data.note,
      processedBy: null,

      requestedQuantity: requestedQty,
    };

    // Submit request
    axios
      .post("http://localhost:5000/requestAsset", requestAssetData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Request submitted!",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: err.message,
        });
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex-col">
        <div className="card bg-base-100 w-full max-w-lg shadow-xl">
          <div className="card-body">
            <h2 className="text-3xl">Requst An Asset</h2>
            <form onSubmit={handleSubmit(handleAssetRequst)}>
              <fieldset className="fieldset">
                {/* Select Asset */}
                <div>
                  <label className="font-medium">Select Asset</label>
                  <select className="select w-full" {...register("assetId")}>
                    <option value="">Choose an asset</option>
                    {assets.map((asset) => (
                      <option key={asset._id} value={asset._id}>
                        {asset.productName} ({asset.availableQuantity}
                        available)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="font-medium">Quantity</label>
                  <input
                    type="number"
                    className="input w-full"
                    min="1"
                    {...register("quantity")}
                    placeholder="Quantity"
                  />
                </div>

                <div>
                  <label className="font-medium">Note/Reason</label>
                  <textarea
                    className="textarea w-full"
                    {...register("note")}
                  ></textarea>
                </div>

                <button className="btn btn-secondary"> Submit A Requst</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestAsset;
