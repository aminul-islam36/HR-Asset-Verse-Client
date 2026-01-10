import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { FiCheckCircle, FiShield, FiBarChart } from "react-icons/fi";
import useaxiosPublic from "../../hooks/useAxiosPublic";

const AddAsset = () => {
  const axiosURL = useaxiosPublic();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, reset, handleSubmit } = useForm();

  const handleAsset = async (data) => {
    setLoading(true);
    try {
      const response = await axiosURL.get(`/users/${user.email}`);
      const { companyName } = response.data;

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
        hrEmail: user.email,
        companyName: companyName,
      };

      const res = await axiosURL.post("/assets", newAsset);

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          icon: "success",
          title: "Asset Registered",
          text: "The item has been added to AssetVerse inventory.",
          confirmButtonColor: "var(--color-primary)",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 flex justify-center items-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-200/50">
        {/* Left Side: Information & Benefits (Hidden on mobile) */}
        <div className="hidden lg:flex bg-primary p-12 flex-col justify-between text-white">
          <div>
            <h1 className="text-4xl font-bold mb-4 arimo italic">AssetVerse</h1>
            <p className="text-blue-100 text-lg mb-8">
              Empower your HR operations with seamless inventory management.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <FiShield size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Secure Tracking</h4>
                  <p className="text-sm text-blue-100">
                    Every asset is tied to your company and HR profile securely.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <FiBarChart size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Real-time Analytics</h4>
                  <p className="text-sm text-blue-100">
                    Instantly update stock levels and availability for your
                    team.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <FiCheckCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Efficiency First</h4>
                  <p className="text-sm text-blue-100">
                    Automate your returnable and non-returnable item workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-blue-200">
            © 2024 AssetVerse Management System. All rights reserved.
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="bg-base-100 p-8 md:p-12">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-neutral">Add New Asset</h2>
            <p className="text-secondary mt-1">
              Please fill in the details below to list a new item.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleAsset)} className="space-y-5">
            <fieldset className="fieldset">
              <div>
                <label className="label text-neutral font-medium">
                  Asset Name
                </label>
                <input
                  {...register("assetName", { required: true })}
                  type="text"
                  placeholder="E e.g. Dell Latitude 5420"
                  className="input w-full pl-5 bg-base-200 border-base-300 focus:border-primary focus-within:outline-0"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                  <label className="label text-neutral font-medium">
                    Asset Type
                  </label>
                  <select
                    {...register("assetType", { required: true })}
                    className="select w-full pl-5 bg-base-200 border-base-300 focus:border-primary focus-within:outline-0"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                  </select>
                </div>

                <div className="">
                  <label className="label text-neutral font-medium">
                    Initial Quantity
                  </label>
                  <input
                    {...register("quantity", { required: true })}
                    type="number"
                    min="1"
                    placeholder="10"
                    className="input w-full pl-5 bg-base-200 border-base-300 no-spinner focus:border-primary focus-within:outline-0"
                  />
                </div>
              </div>

              <div>
                <label className="label text-neutral font-medium">
                  Asset Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-base-300 rounded-lg cursor-pointer bg-base-200 hover:bg-base-300 transition-colors">
                    <input {...register("file")} type="file" className="file" />
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  disabled={loading}
                  className="btn btn-primary w-full h-14 text-white text-lg font-bold shadow-lg"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Add Asset to Verse"
                  )}
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
