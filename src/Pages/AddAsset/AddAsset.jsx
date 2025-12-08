import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddAsset = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();

  const handleAsset = (data) => {
    const newAsset = {
      productName: data.assetName,
      productImage: data.file,
      productType: data.assetType,
      productQuantity: data.quantity,
      availableQuantity: data.quantity,
      dateAdded: new Date().toString(),
      hrEmail: user.email,
      companyName: data.brand,
    };
    console.log(data);
    axios
      .post("http://localhost:5000/assets", newAsset)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Asset Added!",
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
    <div className="max-w-xl mx-auto p-6 my-15 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Asset</h2>

      <form onSubmit={handleSubmit(handleAsset)} className="space-y-4">
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

        {/* Logo  */}

        <div>
          <label className="label">Company Logo</label>
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

        {/* Brand */}
        <div>
          <label className="label">Brand</label>
          <input
            {...register("brand")}
            type="text"
            placeholder="Dell, HP, IKEA..."
            className="input w-full"
          />
        </div>
        {/* Submit Button */}
        <button className="btn btn-secondary w-full mt-2">Add New Asset</button>
      </form>
    </div>
  );
};

export default AddAsset;
