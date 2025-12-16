import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import PageLoader from "../../Components/PageLoader";
import useAxios from "../../hooks/useAxios";

const RequestAsset = () => {
  const { user, isLoading: loading } = useAuth();
  const axiosURL = useAxios();
  const { register, handleSubmit } = useForm();

  // Load all assets
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosURL.get("/assets");
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

    //  request data ------------------
    const requestAssetData = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.productName,
      assetImage: selectedAsset.productImage,
      assetType: selectedAsset.productType,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      hrEmail: selectedAsset.hrEmail,
      companyName: selectedAsset.companyName,
      requestStatus: "pending",
      requestDate: new Date(),
      approvalDate: null,
      processedBy: null,
      note: data.note,
    };

    // Submit request-----------
    axiosURL
      .post("/requestAsset", requestAssetData)
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
