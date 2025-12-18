import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Title from "../../Utilities/Title";

const AddAsset = () => {
  const axiosURL = useAxios();
  const { user } = useAuth();

  const { register, reset, handleSubmit } = useForm();

  const handleAsset = async (data) => {
    const { companyName } = await axiosURL
      .get(`/users/${user.email}`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      });

    // Upload to ImgBB

    const imageFile = data.file[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    const imageBB = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      formData
    );

    const newAsset = {
      productName: data.assetName,
      productImage: imageBB.data.data.url,
      productType: data.assetType,
      productQuantity: Number(data.quantity),
      availableQuantity: Number(data.quantity),
      dateAdded: new Date(),
      hrEmail: user.email,
      companyName: companyName,
    };
    console.log(data);
    axiosURL
      .post("/assets", newAsset)
      .then((res) => {
        if (res.data.insertedId) {
          reset();
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
    <div className="w-11/12 max-w-xl mx-auto p-6 bg-white shadow rounded-lg my-15 border">
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
        <button className="btn btn-secondary w-full mt-2">Add New Asset</button>
      </form>
    </div>
  );
};

export default AddAsset;
