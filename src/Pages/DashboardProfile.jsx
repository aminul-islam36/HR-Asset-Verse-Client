import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FiEdit,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiCamera,
  FiUser,
} from "react-icons/fi";
import useaxiosPublic from "../hooks/useAxiosPublic";

const DashboardProfile = () => {
  const { user, profileUpdate } = useAuth();
  const modalRef = useRef();
  const axiosURL = useaxiosPublic();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const { data: hrData = {}, refetch } = useQuery({
    queryKey: ["hrData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosURL.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const handleEditProfile = async (data) => {
    setLoading(true);
    try {
      let photoURL = user?.photoURL;

      if (data.file && data.file[0]) {
        const formData = new FormData();
        formData.append("image", data.file[0]);
        const imageBB = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          formData
        );
        photoURL = imageBB.data.data.url;
      }

      await profileUpdate({
        displayName: data.name,
        photoURL: photoURL,
      });

      await axiosURL.patch(`/users/${user.email}`, {
        name: data.name,
        photoURL: photoURL,
        phoneNumber: data.phoneNumber,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
      modalRef.current.close();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral flex items-center gap-3">
            <FiUser className="text-primary" />
            My Profile
          </h1>
          <p className="text-secondary mt-2">
            Manage your personal information and account settings
          </p>
        </div>
        <button
          onClick={() => modalRef.current.showModal()}
          className="btn btn-primary flex items-center gap-2"
        >
          <FiEdit />
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-base-100 rounded-2xl shadow-md border border-base-300 overflow-hidden">
        {/* Cover Section */}
        <div className="h-32 bg-linear-to-r from-primary to-secondary"></div>

        {/* User Info Section */}
        <div className="relative px-8 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start -mt-16 mb-8 gap-6">
            <div className="relative group">
              <img
                className="w-32 h-32 rounded-2xl border-4 border-base-100 object-cover shadow-lg bg-base-100"
                src={
                  user?.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/219/219970.png"
                }
                alt="Profile"
              />
              <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <FiCamera className="text-white text-2xl" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left pt-4">
              <h2 className="text-2xl font-bold text-neutral mb-2">
                {user?.displayName || "HR Manager"}
              </h2>
              <p className="text-secondary font-medium flex items-center justify-center md:justify-start gap-2 mb-1">
                <FiBriefcase className="text-primary" />
                {hrData?.companyName || "AssetVerse HR"}
              </p>
              <p className="text-sm text-secondary">HR Administrator</p>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-base-200 rounded-xl p-6 border border-base-300">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <FiMail size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-secondary uppercase tracking-wider font-bold mb-1">
                    Email Address
                  </p>
                  <p className="text-neutral font-semibold truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-base-200 rounded-xl p-6 border border-base-300">
              <div className="flex items-center gap-4">
                <div className="bg-accent/10 p-3 rounded-xl text-accent">
                  <FiPhone size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-secondary uppercase tracking-wider font-bold mb-1">
                    Phone Number
                  </p>
                  <p className="text-neutral font-semibold">
                    {hrData?.phoneNumber || "Not Provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-base-200 rounded-xl p-6 border border-base-300">
              <div className="flex items-center gap-4">
                <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                  <FiCalendar size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-secondary uppercase tracking-wider font-bold mb-1">
                    Member Since
                  </p>
                  <p className="text-neutral font-semibold">
                    {hrData?.createdAt
                      ? new Date(hrData.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })
                      : "Recently"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-8 bg-base-200 rounded-xl p-6 border border-base-300">
            <h3 className="text-lg font-semibold text-neutral mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-secondary font-medium mb-1">
                  Account Type
                </p>
                <p className="text-neutral font-semibold">HR Administrator</p>
              </div>
              <div>
                <p className="text-sm text-secondary font-medium mb-1">
                  Company
                </p>
                <p className="text-neutral font-semibold">
                  {hrData?.companyName || "AssetVerse"}
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary font-medium mb-1">
                  Last Login
                </p>
                <p className="text-neutral font-semibold">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary font-medium mb-1">
                  Status
                </p>
                <span className="badge badge-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 border border-base-300 rounded-2xl p-8 max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral">Update Profile</h2>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost text-neutral hover:bg-base-200">
                <IoMdClose size={20} />
              </button>
            </form>
          </div>

          <form
            onSubmit={handleSubmit(handleEditProfile)}
            className="space-y-6"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral font-semibold">
                  Full Name
                </span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                defaultValue={user?.displayName}
                className="input input-bordered w-full bg-base-200 focus:bg-base-100"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral font-semibold">
                  Phone Number
                </span>
              </label>
              <input
                {...register("phoneNumber")}
                type="tel"
                defaultValue={hrData?.phoneNumber}
                className="input input-bordered w-full bg-base-200 focus:bg-base-100"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral font-semibold">
                  Profile Photo
                </span>
              </label>
              <input
                {...register("file")}
                type="file"
                accept="image/*"
                className="file-input file-input-bordered file-input-primary w-full bg-base-200"
              />
              <label className="label">
                <span className="label-text-alt text-secondary">
                  Choose a new profile picture (optional)
                </span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => modalRef.current.close()}
                className="btn btn-ghost flex-1"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <FiEdit className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DashboardProfile;
